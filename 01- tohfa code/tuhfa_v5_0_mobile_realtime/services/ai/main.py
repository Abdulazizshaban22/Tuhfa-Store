
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

app = FastAPI(title="Tuhfa AI")

@app.get("/health")
def health(): return {"ok": True}

@app.post("/caption")
async def caption(img: UploadFile = File(...)):
    # Demo only — returns a fixed caption. Replace with real model later.
    return JSONResponse({"caption": "قطعة حرفية سعودية — سدو تقليدي", "model":"demo"})
