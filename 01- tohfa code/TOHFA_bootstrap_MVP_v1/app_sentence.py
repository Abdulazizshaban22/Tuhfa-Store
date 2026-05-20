# FastAPI Embeddings Service — Sentence-Transformers upgrade
# Path suggestion: TOHFA_Vinfinity_Unified/apps/ai/app_sentence.py

import os
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

MODEL_NAME = os.getenv("MODEL_NAME", "sentence-transformers/all-MiniLM-L6-v2")

app = FastAPI(title="TOHFA.AI", version="1.0")

# Lazy load to speed startup if model is large
_model = None
def load_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer(MODEL_NAME)
        except Exception as e:
            _model = None
    return _model

class EmbedIn(BaseModel):
    texts: List[str]

class EmbedOut(BaseModel):
    vectors: List[List[float]]
    dim: int
    model: str

@app.get("/health")
def health():
    return {"ok": True, "model": MODEL_NAME}

@app.post("/embed", response_model=EmbedOut)
def embed(inp: EmbedIn):
    # Try sentence-transformers first; fallback to fixed-size hashing for dev
    model = load_model()
    if model is not None:
        vecs = model.encode(inp.texts, normalize_embeddings=True)
        if hasattr(vecs, "tolist"):
            vecs = vecs.tolist()
        dim = len(vecs[0]) if vecs else 0
        return {"vectors": vecs, "dim": dim, "model": MODEL_NAME}
    # Fallback: simple hashing to 384 dims (dev only)
    dim = 384
    out = []
    for t in inp.texts:
        rng = np.random.default_rng(abs(hash(t)) % (2**32))
        out.append(rng.standard_normal(dim).astype(float).tolist())
    return {"vectors": out, "dim": dim, "model": "fallback-hash-384"}

# Run: uvicorn app_sentence:app --host 0.0.0.0 --port 8001
