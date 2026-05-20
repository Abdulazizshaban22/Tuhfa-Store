
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Products table (simplified for demo)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku TEXT UNIQUE,
  title TEXT,
  description TEXT,
  price_sar NUMERIC(12,2),
  image_url TEXT,
  token_uri TEXT
);

-- Embeddings table (768-dim by default; adjust to your model)
CREATE TABLE IF NOT EXISTS product_embeddings (
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  embedding vector(768),
  PRIMARY KEY(product_id)
);

-- HNSW index for cosine similarity
CREATE INDEX IF NOT EXISTS product_embeddings_hnsw
ON product_embeddings
USING hnsw (embedding vector_cosine_ops);
