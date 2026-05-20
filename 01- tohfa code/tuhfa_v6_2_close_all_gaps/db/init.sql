
create extension if not exists vector;

-- Users / Sellers / Museums
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text unique,
  name text,
  role text default 'buyer', -- buyer|seller|museum|admin
  created_at timestamptz default now()
);

create table if not exists sellers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  display_name text,
  verified boolean default false,
  created_at timestamptz default now()
);

create table if not exists museums (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  region text,
  created_at timestamptz default now()
);

-- Catalog
create table if not exists assets (
  id text primary key,
  title text,
  description text,
  seller_id uuid references sellers(id),
  museum_id uuid references museums(id),
  price_sar numeric(14,2),
  currency text default 'SAR',
  media_url text,
  glb_url text,
  created_at timestamptz default now(),
  embedding vector(768)
);
create index if not exists idx_assets_hnsw on assets using hnsw (embedding vector_l2_ops);

-- Orders
create table if not exists orders (
  id bigserial primary key,
  user_id uuid references users(id),
  total_sar numeric(14,2),
  status text default 'pending', -- pending|paid|failed|refunded
  provider text, -- tap|hyperpay
  provider_ref text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id bigserial primary key,
  order_id bigint references orders(id),
  asset_id text references assets(id),
  quantity int default 1,
  price_sar numeric(14,2)
);

-- Payments audit
create table if not exists payments_audit (
  id bigserial primary key,
  order_id bigint references orders(id),
  provider text,
  payload jsonb,
  created_at timestamptz default now()
);

-- Provenance / NFT / NFC
create table if not exists provenance (
  id bigserial primary key,
  asset_id text references assets(id),
  token_id numeric,
  contract text,
  owner text,
  nfc_uid text,
  issued_at timestamptz default now()
);

-- PDPL (consent + DSR)
create table if not exists pdpl_consent (
  id bigserial primary key,
  user_id uuid,
  purpose text, -- marketing|analytics|payments|web3
  granted boolean,
  ip text,
  user_agent text,
  created_at timestamptz default now()
);

create table if not exists pdpl_dsr (
  id bigserial primary key,
  user_id uuid,
  kind text, -- access|export|delete|rectify|object
  details text,
  status text default 'received', -- received|processing|done|rejected
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- Analytics time series
create table if not exists daily_metrics (
  day date primary key,
  sales_count int default 0,
  revenue_sar numeric(14,2) default 0,
  visitors int default 0
);
