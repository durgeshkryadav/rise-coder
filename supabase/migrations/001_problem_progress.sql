-- =============================================
-- Supabase migration: problem_progress table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- Table storing per-user Blind 75 problem completion/star status
create table if not exists public.problem_progress (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  problem_id text not null,
  completed  boolean not null default false,
  starred    boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Each user may have only one row per problem
  unique (user_id, problem_id)
);

-- Enable Row Level Security
alter table public.problem_progress enable row level security;

-- Policy: Users can read only their own rows
create policy "Users can read own progress"
  on public.problem_progress
  for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own rows
create policy "Users can insert own progress"
  on public.problem_progress
  for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own rows
create policy "Users can update own progress"
  on public.problem_progress
  for update
  using (auth.uid() = user_id);

-- Index for fast lookup by user
create index if not exists idx_problem_progress_user
  on public.problem_progress (user_id);
