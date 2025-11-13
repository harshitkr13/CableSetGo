CableSetGo (HTML/CSS/JS + Supabase)
===================================

Quick start
-----------
1) Create `assets/js/sysenv.js` from the example, and fill your keys:

```
copy assets/js/sysenv.example.js assets/js/sysenv.js
```

2) Open `index.html` in a local server (VSCode Live Server or `npx serve`).

Features scaffolded
-------------------
- Welcome dashboard with language selector (English/Hindi/Bangla) and auto default.
- Phone OTP login via Supabase Auth.
- Profile setup storing name/address/pincode/lat/lng in `profiles` table.
- Provider search within 5km, expanding to 15km, else regret message.
- Complaint/Feedback creating `ticket_id` and inserting into `complaints` table.
- Gemini chatbot shell with 1-minute delay enforcement (placeholder response).
- FAQ page.
- Admin page read-only tables for users/providers/complaints.

Supabase setup
--------------
Create tables (SQL):

```
-- profiles
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  phone text,
  full_name text,
  address text,
  pincode text,
  lat double precision,
  lng double precision,
  updated_at timestamp with time zone default now()
);
alter table public.profiles enable row level security;
create policy "Profiles are viewable by owner" on public.profiles
  for select using ( auth.uid() = user_id );
create policy "Profiles are insertable by owner" on public.profiles
  for insert with check ( auth.uid() = user_id );
create policy "Profiles are updatable by owner" on public.profiles
  for update using ( auth.uid() = user_id );

-- providers
create table if not exists public.providers (
  id bigserial primary key,
  name text not null,
  service text,
  phone text,
  lat double precision,
  lng double precision
);
alter table public.providers enable row level security;
create policy "Providers readable by all" on public.providers
  for select using ( true );

-- complaints
create table if not exists public.complaints (
  ticket_id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  type text check (type in ('complaint','feedback')),
  subject text,
  message text,
  status text default 'open',
  created_at timestamp with time zone default now()
);
alter table public.complaints enable row level security;
create policy "Complaints readable by owner" on public.complaints
  for select using ( auth.uid() = user_id );
create policy "Complaints insertable by owner" on public.complaints
  for insert with check ( auth.uid() = user_id );
```

Auth (OTP via SMS):
- In Supabase Dashboard → Authentication → Providers → Phone, configure your SMS provider (e.g., Twilio).
- Use the Anon key in `assets/js/sysenv.js`.

Complaint verification email (Edge Function)
--------------------------------------------
Create an Edge Function `send-complaint-email` that sends an email from your `no-reply-cablesetgo` SMTP. Example pseudo-code:

```
import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { ticketId, userId, subject, message } = await req.json()
  // Lookup user email from auth or profiles, send email via SMTP provider API
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } })
})
```

Set its URL in `COMPLAINTS_EMAIL_FN_URL` inside `assets/js/sysenv.js`. Configure CORS to allow your domain.

Gemini integration
------------------
For real responses, call Gemini Pro with your API key on a server to avoid exposing secrets. The client currently shows a placeholder and enforces a 1-minute delay between messages.

Notes
-----
- This is a static frontend. For secure email sending and advanced geo defaults, use Supabase Edge Functions or a small backend.
- Admin page is read-only here; add role checks and mutations as needed.


