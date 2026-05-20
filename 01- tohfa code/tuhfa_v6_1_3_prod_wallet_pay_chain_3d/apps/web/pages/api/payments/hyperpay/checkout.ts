
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Placeholder: Initialize HyperPay COPYandPAY or Server-to-Server checkout.
 * Docs (Arabic): https://www.hyperpay.com/ar/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B1%D8%A8%D8%B7/
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  const { amount='100.00', currency='SAR', description='Tuhfa order' } = req.body || {};
  const entity = process.env.HYPERPAY_ENTITY_ID;
  const base = process.env.HYPERPAY_BASE || 'https://eu-prod.oppwa.com';
  if(!entity) return res.status(400).json({ error:'HYPERPAY_ENTITY_ID missing' });
  // NOTE: In real deployment, call HyperPay /v1/checkouts with entityId, amount, currency, paymentType, and ApplePay/mada parameters.
  return res.status(200).json({ ok:true, provider:'hyperpay', checkoutId:'placeholder', amount, currency, description });
}
