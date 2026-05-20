-- prisma/migrations/20251108_pgvector_init/migration.sql
CREATE EXTENSION IF NOT EXISTS vector;
-- Create a real vector column and keep Prisma model as proxy
-- Adjust dimension to 384 for all-MiniLM-L6-v2
CREATE TABLE IF NOT EXISTS "ProductEmbedding_real" (
  product_id TEXT PRIMARY KEY REFERENCES "Product"(id) ON DELETE CASCADE,
  embedding  vector(384)
);
-- Optional: HNSW index for cosine distance
CREATE INDEX IF NOT EXISTS product_embedding_hnsw
ON "ProductEmbedding_real" USING hnsw (embedding vector_cosine_ops);
