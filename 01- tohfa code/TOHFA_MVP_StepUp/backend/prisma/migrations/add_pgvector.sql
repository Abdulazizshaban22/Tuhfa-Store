-- Install pgvector and add an embedding column to Product
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS embedding vector(768);
