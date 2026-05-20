-- v3.9.1 schema (vector 512 + events)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku TEXT UNIQUE,
  title TEXT,
  description TEXT,
  price_sar NUMERIC(12,2),
  image_url TEXT,
  token_uri TEXT
);

CREATE TABLE IF NOT EXISTS product_embeddings (
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  embedding vector(512),
  PRIMARY KEY(product_id)
);

-- HNSW index (cosine)
CREATE INDEX IF NOT EXISTS product_embeddings_hnsw
ON product_embeddings USING hnsw (embedding vector_cosine_ops);

-- Events for analytics
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  kind TEXT NOT NULL,        -- 'payment_created','payment_succeeded','nfc_scan','mint'
  ref TEXT,                  -- order id / tx hash / sku
  created_at TIMESTAMP DEFAULT now()
);
