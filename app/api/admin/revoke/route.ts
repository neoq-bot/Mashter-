import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminUser, getProfile } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { adminEmail, targetEmail, plan, subscriptionStatus } = req.body;

  if (!adminEmail || !targetEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const profile = await getProfile(adminEmail, supabaseAdmin);

    if (!isAdminUser(profile)) {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }

    // Update user plan and subscription status
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        plan: plan || 'free',
        subscription_status: subscriptionStatus || 'inactive',
        is_whitelisted: false,
      })
      .eq('email', targetEmail);

    if (error) {
      throw error;
    }

    // Log action
    await supabaseAdmin.from('audit_log').insert([
      {
        action: 'ACCESS_REVOKED',
        admin_email: adminEmail,
        target_user_email: targetEmail,
        details: { previousPlan: plan, newPlan: 'free' },
      },
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error revoking access:', error);
    return res.status(500).json({ error: 'Failed to revoke access' });
  }
}