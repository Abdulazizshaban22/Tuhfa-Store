import io, os, base64
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration, CLIPProcessor, CLIPModel

app = FastAPI(title="Tuhfa AI", version="0.1")

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# BLIP captioning
_blip_proc = None
_blip_model = None

# CLIP for image/text embeddings (512-d)
_clip_proc = None
_clip_model = None

def get_blip():
    global _blip_proc, _blip_model
    if _blip_proc is None:
        _blip_proc = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        _blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(DEVICE)
    return _blip_proc, _blip_model

def get_clip():
    global _clip_proc, _clip_model
    if _clip_proc is None:
        _clip_proc = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        _clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(DEVICE)
    return _clip_proc, _clip_model

@app.post("/caption")
async def caption(image: UploadFile = File(...)):
    proc, model = get_blip()
    data = await image.read()
    img = Image.open(io.BytesIO(data)).convert("RGB")
    inputs = proc(img, return_tensors="pt").to(DEVICE)
    out = model.generate(**inputs, max_new_tokens=40)
    text = proc.decode(out[0], skip_special_tokens=True)
    return {"caption": text}

@app.post("/embed_image")
async def embed_image(image: UploadFile = File(...)):
    proc, model = get_clip()
    data = await image.read()
    img = Image.open(io.BytesIO(data)).convert("RGB")
    inputs = proc(images=img, return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        emb = model.get_image_features(**inputs)
        emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
    return {"embedding": emb.cpu().tolist()[0]}

@app.post("/embed_text")
async def embed_text(text: str = Form(...)):
    proc, model = get_clip()
    inputs = proc(text=[text], return_tensors="pt", padding=True).to(DEVICE)
    with torch.no_grad():
        emb = model.get_text_features(**inputs)
        emb = emb / emb.norm(p=2, dim=-1, keepdim=True)
    return {"embedding": emb.cpu().tolist()[0]}
