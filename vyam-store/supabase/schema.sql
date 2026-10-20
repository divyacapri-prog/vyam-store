-- VYAM store schema. Run this once in Supabase: SQL Editor → New query → paste → Run.

create table if not exists orders (
  ref text primary key,
  amount integer not null,
  status text not null default 'created',       -- created | paid | demo | shipped | cancelled
  customer jsonb not null,                       -- { name, email, phone, address, city, state, pincode }
  items jsonb not null,                          -- [{ slug, name, variant, qty, price }]
  rzp_order_id text,
  rzp_payment_id text,
  created_at timestamptz not null default now()
);

-- Optional: manage the catalog in the database later (the app currently ships
-- with its catalog bundled; this table is ready for when you want DB-driven products).
create table if not exists products (
  slug text primary key,
  brand text not null,
  name text not null,
  short text,
  description text,
  buyable boolean not null default false,
  variants jsonb not null default '[]',          -- [{ label, price, note }]
  images jsonb not null default '[]',
  features jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- Lock everything down. The site's API routes use the service-role key,
-- which bypasses RLS; nothing is exposed to the public.
alter table orders enable row level security;
alter table products enable row level security;

create policy "public can read products" on products for select using (true);
