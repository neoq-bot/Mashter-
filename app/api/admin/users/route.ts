import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminUser, getProfile } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminEmail = req.query.email as string;

  if (!adminEmail) {
    return res.status(400).json({ error: 'Email parameter required' });
  }

  try {
    const profile = await getProfile(adminEmail, supabaseAdmin);

    if (!isAdminUser(profile)) {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }

    // Fetch all users
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}