from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io, numpy as np

app = FastAPI(title="TOHFA AI v3.7")

# Lazy-load models on first use to reduce container cold start time.
caption_model = None
processor = None
clip_model = None
clip_processor = None

@app.get('/')
def root():
    return {"ok": True, "service": "tohfa-ai v3.7"}

@app.post('/embed')
async def embed_text(payload: dict):
    # Placeholder: in real setup, call SentenceTransformers and return list[float]
    text = payload.get('text', '')
    vec = [0.0]*384
    return {"vector": vec, "model": "MiniLM-L6-v2"}

@app.post('/caption')
async def caption(file: UploadFile = File(...)):
    global caption_model, processor
    try:
        from transformers import BlipProcessor, BlipForConditionalGeneration
        if caption_model is None:
            processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
            caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        inputs = processor(image, return_tensors="pt")
        out = caption_model.generate(**inputs, max_new_tokens=32)
        caption = processor.decode(out[0], skip_special_tokens=True)
        return {"caption": caption}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post('/clip-filter')
async def clip_filter(file: UploadFile = File(...)):
    """Very lightweight cultural safety filter prototype using CLIP similarities.
    Returns a score against an 'inappropriate' label list vs 'heritage' label list.
    """
    global clip_model, clip_processor
    try:
        from transformers import CLIPProcessor, CLIPModel
        if clip_model is None:
            clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
            clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        texts_ok = ["Saudi heritage craft", "museum artifact", "traditional handcraft"]
        texts_block = ["nudity", "violence", "hate symbol"]
        inputs_ok = clip_processor(text=texts_ok, images=image, return_tensors="pt", padding=True)
        inputs_block = clip_processor(text=texts_block, images=image, return_tensors="pt", padding=True)
        with torch.no_grad():
            ok_score = clip_model(**inputs_ok).logits_per_image.softmax(dim=1)[0].max().item()
            block_score = clip_model(**inputs_block).logits_per_image.softmax(dim=1)[0].max().item()
        return {"ok_score": ok_score, "block_score": block_score}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})