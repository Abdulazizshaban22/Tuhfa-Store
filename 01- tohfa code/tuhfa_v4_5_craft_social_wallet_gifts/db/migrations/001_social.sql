
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  handle TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT
);
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  content TEXT,
  media_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS stories (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  media_url TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);
