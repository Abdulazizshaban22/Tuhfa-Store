
CREATE TABLE IF NOT EXISTS wallet_assets (
  id BIGSERIAL PRIMARY KEY,
  owner_address TEXT,
  token_id TEXT,
  contract_address TEXT,
  certificate_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS listings (
  id BIGSERIAL PRIMARY KEY,
  token_id TEXT,
  contract_address TEXT,
  seller_address TEXT,
  price_sar NUMERIC(12,2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now()
);
