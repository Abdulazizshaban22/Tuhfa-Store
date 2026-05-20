
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
app = FastAPI(title="Tuhfa AI v6.0")
@app.get("/health") 
def health(): return {"ok": True, "v": "6.0"}
@app.post("/caption")
async def caption(img: UploadFile = File(...)):
    return JSONResponse({"caption": "قطعة حرفية سعودية — سدو تقليدي", "model":"demo-v6"})
