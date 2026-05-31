-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  is_admin BOOLEAN DEFAULT false,
  is_whitelisted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX profiles_email_idx ON profiles(email);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email');

-- Admin setup script (run manually in Supabase SQL editor):
-- UPDATE profiles SET is_admin = true WHERE email = 'nmdakane860@gmail.com';

-- Signals history table (optional - for tracking historical signals)
CREATE TABLE signal_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pair TEXT NOT NULL,
  signal TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  entry DECIMAL(20, 8),
  stop_loss DECIMAL(20, 8),
  take_profit DECIMAL(20, 8),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on pair and created_at for faster queries
CREATE INDEX signal_history_pair_time_idx ON signal_history(pair, created_at DESC);

-- Whitelist audit log
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  target_user_email TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX audit_log_admin_idx ON audit_log(admin_email);
CREATE INDEX audit_log_created_idx ON audit_log(created_at DESC);