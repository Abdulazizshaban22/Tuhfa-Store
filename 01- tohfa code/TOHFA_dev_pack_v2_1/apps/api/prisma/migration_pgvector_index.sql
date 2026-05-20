-- Create cosine index for fast similarity search
CREATE INDEX IF NOT EXISTS product_embedding_hnsw_cosine
ON "ProductEmbedding_real" USING hnsw (embedding vector_cosine_ops);
