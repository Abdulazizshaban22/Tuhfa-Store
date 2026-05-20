
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS items (
  id BIGSERIAL PRIMARY KEY,
  path TEXT,
  embedding vector(128)
);
-- تفعيل فهرس HNSW (يتطلب pgvector >= 0.5):
-- CREATE INDEX IF NOT EXISTS items_embedding_hnsw ON items USING hnsw (embedding vector_l2_ops);
