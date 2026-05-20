
-- Museums & Assets (Geo-enabled)
CREATE TABLE IF NOT EXISTS museums (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  geom GEOGRAPHY(Point, 4326),
  meta JSONB
);
CREATE TABLE IF NOT EXISTS cultural_assets (
  id BIGSERIAL PRIMARY KEY,
  museum_id BIGINT REFERENCES museums(id),
  title TEXT,
  schema_ld JSONB,
  iiif_manifest TEXT,
  geom GEOGRAPHY(Point, 4326),
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS iiif_assets (
  id BIGSERIAL PRIMARY KEY,
  asset_id BIGINT REFERENCES cultural_assets(id),
  info_json TEXT,
  service_id TEXT,
  profile TEXT
);
-- RBAC
CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE
);
INSERT INTO roles(name) VALUES ('museum_admin'),('curator'),('researcher'),('auditor')
ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT
);
CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT REFERENCES users(id),
  role_id BIGINT REFERENCES roles(id),
  museum_id BIGINT REFERENCES museums(id),
  PRIMARY KEY (user_id, role_id, museum_id)
);
-- PDPL
CREATE TABLE IF NOT EXISTS pdpl_requests (
  id BIGSERIAL PRIMARY KEY,
  requester TEXT,
  type TEXT, -- access / rectification / deletion
  status TEXT DEFAULT 'open',
  payload JSONB,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor TEXT,
  action TEXT,
  resource TEXT,
  created_at TIMESTAMP DEFAULT now()
);
