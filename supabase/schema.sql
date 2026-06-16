-- ============================================================
-- AI Powered Digital Notice Board  –  Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================
 
-- Enable UUID generation
create extension if not exists "pgcrypto";
 
-- ─────────────────────────────────────────
-- notices table
-- ─────────────────────────────────────────
create table if not exists notices (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  description  text        not null,
  category     text        not null default 'General',
  important    boolean     not null default false,
  expiry_date  date,
  created_at   timestamptz not null default now()
);
 
-- ─────────────────────────────────────────
-- Indexes for common query patterns
-- ─────────────────────────────────────────
create index if not exists idx_notices_category    on notices (category);
create index if not exists idx_notices_important   on notices (important);
create index if not exists idx_notices_created_at  on notices (created_at desc);
create index if not exists idx_notices_expiry_date on notices (expiry_date);
 
-- ─────────────────────────────────────────
-- Row-Level Security (RLS)
-- ─────────────────────────────────────────
-- Enable RLS
alter table notices enable row level security;
 
-- Allow anyone to read notices (public board)
create policy "Public read access"
  on notices for select
  using (true);
 
-- Allow anyone to insert/update/delete notices
-- ⚠️  In production, restrict these to authenticated admins only.
create policy "Public insert access"
  on notices for insert
  with check (true);
 
create policy "Public update access"
  on notices for update
  using (true);
 
create policy "Public delete access"
  on notices for delete
  using (true);
 
-- ─────────────────────────────────────────
-- Sample seed data (optional – remove in prod)
-- ─────────────────────────────────────────
insert into notices (title, description, category, important, expiry_date) values
  (
    'Semester Examination Schedule',
    'The semester examinations will commence on 25 June 2026. Students must carry their hall tickets. Reporting time is 9:00 AM. The examination hall will be opened at 8:45 AM. No electronic devices are permitted inside the hall.',
    'Academics',
    true,
    '2026-07-10'
  ),
  (
    'Placement Training – Week 3',
    'Placement training is scheduled for 20 June 2026 from 10:00 AM to 12:00 PM in Seminar Hall A. Topics covered: Aptitude, Logical Reasoning, and Group Discussion techniques. Attendance is mandatory for final year students.',
    'Placement',
    true,
    '2026-06-21'
  ),
  (
    'Library Closure Notice',
    'The central library will remain closed on 18 June 2026 (Wednesday) due to annual stock verification. Digital library resources will be accessible online. Normal operations resume on 19 June 2026.',
    'General',
    false,
    '2026-06-19'
  ),
  (
    'National Level Hackathon 2026',
    'Registrations are open for the National Level Hackathon 2026 to be held on 28–29 June 2026. Teams of 3–4 members. Problem statements will be released on 22 June. Register at the college portal before 20 June 2026.',
    'Events',
    true,
    '2026-06-27'
  ),
  (
    'Sports Day Registration',
    'Annual Sports Day will be held on 5 July 2026. Students interested in participating in athletics, basketball, cricket, or badminton must register at the Physical Education Department by 25 June 2026.',
    'Sports',
    false,
    '2026-07-05'
  );
 
