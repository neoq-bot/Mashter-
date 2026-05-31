import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyStripeWebhookSignature } from '@/lib/stripe';

export const config = {
  api: {
    bodyParser: {
      raw: true,
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'] as string;
  const body = req.body;

  let event;

  try {
    event = verifyStripeWebhookSignature(body, signature);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const email = session.customer_email;

        // Update user to PRO subscription
        await supabaseAdmin
          .from('profiles')
          .update({
            plan: 'pro',
            subscription_status: 'active',
          })
          .eq('email', email);

        console.log(`✅ User upgraded to PRO: ${email}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        const email = subscription.customer_email;

        // Downgrade user to FREE subscription
        await supabaseAdmin
          .from('profiles')
          .update({
            plan: 'free',
            subscription_status: 'inactive',
          })
          .eq('email', email);

        console.log(`❌ User downgraded to FREE: ${email}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}