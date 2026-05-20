
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
app = FastAPI(title="Tuhfa AI v6.1.2")
@app.get("/health") 
def health(): return {"ok": True, "v": "6.1.2"}
@app.post("/caption")
async def caption(img: UploadFile = File(...)):
    return JSONResponse({"caption": "سدو نجدي — نقشة تقليدية", "confidence": 0.82})
