-- CRITICAL: Admin Setup Script
-- Run this ONLY ONCE in Supabase SQL editor
-- After creating the profile for nmdakane860@gmail.com

UPDATE profiles
SET is_admin = true
WHERE email = 'nmdakane860@gmail.com';

-- Verify:
SELECT email, is_admin, plan, subscription_status FROM profiles WHERE email = 'nmdakane860@gmail.com';