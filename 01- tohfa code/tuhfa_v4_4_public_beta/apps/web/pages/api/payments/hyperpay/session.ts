
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ provider: 'hyperpay', checkoutId: 'OPPWA_CHECKOUT_ID' });
}
