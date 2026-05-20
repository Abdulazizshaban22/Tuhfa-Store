
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
app = FastAPI(title="Tuhfa AI v6.1")
@app.get("/health") 
def health(): return {"ok": True, "v": "6.1"}
@app.post("/caption")
async def caption(img: UploadFile = File(...)):
    # Replace with real model (CLIP/BLIP) later.
    return JSONResponse({"caption": "سدو نجدي — نقشة تقليدية", "confidence": 0.82})
