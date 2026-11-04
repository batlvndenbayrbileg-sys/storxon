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

-- ============ Интерактив хичээлийн явц ба хадгалсан код ============
-- Суралцагч бүр ЗӨВХӨН өөрийн мөрийг л уншиж/бичнэ (RLS: user_id = auth.uid()).
-- Бүртгэлгүй (жишээ нь нийтийн /playground) үед апп энэ хүснэгтэд огт хандахгүй,
-- зөвхөн localStorage ашиглана (src/lib/lessons/progress.ts).

-- Дуусгасан даалгавар/асуулт (task_id нь "<lessonId>:<blockIndex>" хэлбэртэй).
create table if not exists public.lesson_progress (
  user_id     uuid not null references auth.users (id) on delete cascade,
  task_id     text not null,
  completed   boolean not null default true,
  updated_at  timestamptz not null default now(),
  primary key (user_id, task_id)
);
alter table public.lesson_progress enable row level security;

drop policy if exists "own progress select" on public.lesson_progress;
create policy "own progress select" on public.lesson_progress
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "own progress insert" on public.lesson_progress;
create policy "own progress insert" on public.lesson_progress
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "own progress update" on public.lesson_progress;
create policy "own progress update" on public.lesson_progress
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Суралцагчийн засаж бичсэн код (block_id нь "<lessonId>:<blockIndex>").
create table if not exists public.workspaces (
  user_id     uuid not null references auth.users (id) on delete cascade,
  block_id    text not null,
  code        jsonb not null,                      -- { html, css, js }
  updated_at  timestamptz not null default now(),
  primary key (user_id, block_id)
);
alter table public.workspaces enable row level security;

drop policy if exists "own workspace select" on public.workspaces;
create policy "own workspace select" on public.workspaces
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "own workspace insert" on public.workspaces;
create policy "own workspace insert" on public.workspaces
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "own workspace update" on public.workspaces;
create policy "own workspace update" on public.workspaces
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
