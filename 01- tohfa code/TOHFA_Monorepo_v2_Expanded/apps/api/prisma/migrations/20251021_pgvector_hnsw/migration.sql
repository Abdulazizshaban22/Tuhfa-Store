-- Enable pgvector and add vector column/index
CREATE EXTENSION IF NOT EXISTS vector;
-- Ensure column exists with desired dim; if not, apply manually in table definition/migration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='Product' AND column_name='embedding'
  ) THEN
    ALTER TABLE "Product" ADD COLUMN embedding vector(384);
  END IF;
END $$;
-- Recommended HNSW index (cosine distance)
CREATE INDEX IF NOT EXISTS product_embedding_hnsw
ON "Product" USING hnsw (embedding vector_cosine_ops);
