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
