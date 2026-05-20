
import uvicorn, numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

try:
    from sentence_transformers import SentenceTransformer
    _model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
except Exception as e:
    _model = None
    print('WARNING: model not loaded yet ->', e)

app = FastAPI(title='TOHFA AI')

class Inp(BaseModel):
    text: str

@app.post('/embed')
def embed(i: Inp):
    global _model
    if _model is None:
        # Lazy load retry
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    v = _model.encode([i.text])[0].astype(np.float32)
    return { "vector": v.tolist(), "dim": int(v.shape[0]) }

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8079, reload=False)
