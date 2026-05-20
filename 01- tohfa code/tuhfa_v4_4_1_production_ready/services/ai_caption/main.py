
from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io, numpy as np
app = FastAPI()
@app.get('/health')
def health():
  return {'ok': True}
@app.post('/caption')
async def caption(file: UploadFile = File(...)):
  content = await file.read()
  img = Image.open(io.BytesIO(content)).convert('RGB')
  w, h = img.size
  arr = np.array(img).astype('float32')/255.0
  avg = arr.mean(axis=(0,1))
  caption = f"صورة ({w}x{h}) — متوسط الألوان RGB≈({avg[0]:.2f},{avg[1]:.2f},{avg[2]:.2f})."
  return {'caption': caption}
# ملاحظة: للانتقال إلى BLIP-2/CLIP، نفّذ نموذجًا فعليًا وأعد نفس الاستجابة.
