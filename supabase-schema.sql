create table if not exists public.quiz_comments (
  id uuid primary key default gen_random_uuid(),
  question_id text not null,
  step_id text default '',
  name text not null default '同學',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.quiz_comments enable row level security;

drop policy if exists "Public comments are readable" on public.quiz_comments;
create policy "Public comments are readable"
on public.quiz_comments
for select
to anon
using (true);

drop policy if exists "Students can add comments" on public.quiz_comments;
create policy "Students can add comments"
on public.quiz_comments
for insert
to anon
with check (
  question_id in (
    'q1', 'q2', 'q3', 'q4', 'q5',
    '0604-q1', '0604-q2', '0604-q3', '0604-q4', '0604-q5'
  )
  and char_length(name) <= 18
  and char_length(message) between 1 and 500
);
