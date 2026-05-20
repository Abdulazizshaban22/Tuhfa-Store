from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI()

class EmbedIn(BaseModel):
    text: str

@app.get("/health")
def h(): return {"ok": True}

@app.post("/embed")
def embed(body: EmbedIn):
    # dummy 384-dim vector
    vec = np.random.rand(384).astype(float).tolist()
    return {"embedding": vec}
