-- ═══ Ichibot Robotics — Supabase Schema ════════════════════════
-- Jalankan di Supabase SQL Editor

-- ─── Products ───────────────────────────────────────────────────
CREATE TABLE products (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text UNIQUE NOT NULL,
  name           text NOT NULL,
  category       text NOT NULL CHECK (category IN ('line-follower','sumo','transporter','myrio')),
  badge          text,
  price          text,
  price_original text,
  description    text,
  specs_col1     text[] DEFAULT '{}',
  specs_col2     text[] DEFAULT '{}',
  whatsapp_text  text,
  image_url      text,
  sort_order     int DEFAULT 0,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

-- ─── Pelatihan ──────────────────────────────────────────────────
CREATE TABLE pelatihan (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name            text NOT NULL,
  badge           text,
  price_ichibot   text,
  price_inhouse   text,
  duration        text,
  capacity        text,
  description     text,
  specs_col1      text[] DEFAULT '{}',
  specs_col2      text[] DEFAULT '{}',
  whatsapp_text   text,
  image_url       text,
  sort_order      int DEFAULT 0,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ─── Events ─────────────────────────────────────────────────────
CREATE TABLE events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  title        text NOT NULL,
  badge        text,
  event_date   date,
  location     text,
  description  text,
  specs_col1   text[] DEFAULT '{}',
  specs_col2   text[] DEFAULT '{}',
  image_url    text,
  is_featured  boolean DEFAULT false,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- ─── Posts (blog + achievements) ────────────────────────────────
CREATE TABLE posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  category    text,
  badge       text,
  date        date,
  excerpt     text,
  content     text,
  image_url   text,
  is_featured boolean DEFAULT false,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- ─── Team ───────────────────────────────────────────────────────
CREATE TABLE team (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  role       text,
  bio        text,
  avatar_url text,
  sort_order int DEFAULT 0
);

-- ─── Export Destinations ────────────────────────────────────────
CREATE TABLE export_destinations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  latitude     float NOT NULL,
  longitude    float NOT NULL
);

-- ─── Settings ───────────────────────────────────────────────────
CREATE TABLE settings (
  key   text PRIMARY KEY,
  value text NOT NULL DEFAULT ''
);

INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '6281234567890'),
  ('shopee_url',      ''),
  ('tokopedia_url',   ''),
  ('tiktokshop_url',  ''),
  ('instagram_url',   ''),
  ('youtube_url',     ''),
  ('facebook_url',    ''),
  ('tiktok_url',      ''),
  ('stat_countries',  '17+'),
  ('stat_users',      '500+'),
  ('stat_wins',       '1000+'),
  ('stat_years',      '10+'),
  ('address',         'Jl. Kaliurang KM. 14, Ngemplak, Sleman, Yogyakarta 55584'),
  ('maps_embed_url',  ''),
  ('user_portal_url', 'https://user.ichibot.id'),
  ('docs_url',        'https://docs.ichibot.id');

-- ─── RLS Policies ───────────────────────────────────────────────
-- Public read untuk semua tabel konten
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE pelatihan ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read products"    ON products    FOR SELECT USING (true);
CREATE POLICY "public read pelatihan"   ON pelatihan   FOR SELECT USING (true);
CREATE POLICY "public read events"      ON events      FOR SELECT USING (true);
CREATE POLICY "public read posts"       ON posts       FOR SELECT USING (true);
CREATE POLICY "public read team"        ON team        FOR SELECT USING (true);
CREATE POLICY "public read destinations" ON export_destinations FOR SELECT USING (true);
CREATE POLICY "public read settings"    ON settings    FOR SELECT USING (true);
