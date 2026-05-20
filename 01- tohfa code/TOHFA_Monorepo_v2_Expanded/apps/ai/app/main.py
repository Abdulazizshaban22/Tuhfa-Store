from fastapi import FastAPI
from pydantic import BaseModel
import math, random
app = FastAPI(title="TOHFA AI")
class EmbedIn(BaseModel): text: str
@app.get("/health") def health(): return {"ok": True}
@app.post("/embed")
def embed(inp: EmbedIn):
    # Dummy embedding; replace with sentence-transformers (MiniLM) in production
    random.seed(hash(inp.text) % (2**32))
    vec = [random.random() for _ in range(384)]
    norm = math.sqrt(sum(x*x for x in vec)) or 1.0
    vec = [x/norm for x in vec]
    return {"vector": vec, "dim": len(vec)}
