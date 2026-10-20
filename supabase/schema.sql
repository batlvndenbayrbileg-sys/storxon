-- Storxon pre-registration table. Run once in the Supabase SQL editor.
create table if not exists public.preorders (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 80),
  phone       text not null unique check (phone ~ '^[0-9]{8}$'),
  plan        text not null check (plan in ('standard', 'pro')),
  segment     text not null default 'other'
              check (segment in ('highschool', 'student', 'business', 'career', 'other')),
  status      text not null default 'new'
              check (status in ('new', 'invoiced', 'paid', 'cancelled')),
  created_at  timestamptz not null default now()
);

-- Only the server (service role key) writes here; no public access.
alter table public.preorders enable row level security;

-- ============ Төлбөр ба видео хичээлийн эрх ============
create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  email            text not null,
  name             text not null,
  phone            text not null,
  plan             text not null check (plan in ('standard', 'pro')),
  segment          text not null default 'other',
  amount           integer not null check (amount > 0),          -- төгрөг, server тооцоолно
  status           text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  qpay_invoice_id  text,
  callback_token   text not null,                                 -- хуурамч QPay callback-аас хамгаална
  created_at       timestamptz not null default now(),
  paid_at          timestamptz
);
create index if not exists orders_email_idx on public.orders (lower(email));

create table if not exists public.enrollments (
  email       text primary key,                                   -- жижиг үсгээр
  plan        text not null check (plan in ('standard', 'pro')),
  order_id    uuid references public.orders (id),
  created_at  timestamptz not null default now()
);

alter table public.orders enable row level security;        -- зөвхөн server (service role)
alter table public.enrollments enable row level security;

drop policy if exists "own enrollment" on public.enrollments;
create policy "own enrollment" on public.enrollments
  for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));
