
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT,
  bio TEXT
);
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  artist_id INT REFERENCES artists(id),
  region TEXT,
  material TEXT,
  style TEXT,
  created_at timestamptz DEFAULT now(),
  embedding vector(768)
);
CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  price_numeric NUMERIC(14,2),
  currency TEXT DEFAULT 'SAR',
  channel TEXT,
  happened_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS provenance (
  asset_id TEXT REFERENCES assets(id),
  token_id TEXT,
  contract TEXT,
  owner TEXT,
  nfc_uid TEXT,
  issued_at timestamptz DEFAULT now()
);
-- sample
INSERT INTO artists (name,region,bio) VALUES
('حرفي نجد','نجد','متخصص في السدو التقليدي') ON CONFLICT DO NOTHING;
INSERT INTO assets (id,title,description,artist_id,region,material,style)
VALUES ('TUHFA-0001','سدو نجدي','منسوج يدويًا بخيوط الصوف',1,'الرياض','صوف','سدو')
ON CONFLICT DO NOTHING;
