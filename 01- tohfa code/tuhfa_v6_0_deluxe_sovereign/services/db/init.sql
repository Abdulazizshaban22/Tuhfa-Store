
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS assets (
  id text primary key,
  title text,
  description text,
  embedding vector(768),
  created_at timestamptz default now()
);
CREATE TABLE IF NOT EXISTS provenance (
  asset_id text references assets(id),
  token_id text,
  contract text,
  owner text,
  nfc_uid text,
  created_at timestamptz default now()
);
