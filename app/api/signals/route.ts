import { NextApiRequest, NextApiResponse } from 'next';
import { generateMockMarketData, generateSignal } from '@/lib/signals';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD', 'XAU/USD', 'BTC/USD'];

  try {
    const signals = pairs.map((pair) => {
      const marketData = generateMockMarketData(pair);
      const signal = generateSignal(marketData);
      return signal;
    });

    return res.status(200).json(signals);
  } catch (error) {
    console.error('Error generating signals:', error);
    return res.status(500).json({ error: 'Failed to generate signals' });
  }
}