
CREATE TABLE IF NOT EXISTS gift_products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  price_sar NUMERIC(12,2),
  image_url TEXT
);
CREATE TABLE IF NOT EXISTS gift_bundles (
  id BIGSERIAL PRIMARY KEY,
  customer TEXT,
  item_ids JSONB,
  certificate_json JSONB,
  created_at TIMESTAMP DEFAULT now()
);
