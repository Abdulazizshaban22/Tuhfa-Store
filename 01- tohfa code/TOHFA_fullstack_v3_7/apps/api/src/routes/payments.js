import express from 'express';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

const CreateSchema = z.object({
  amount: z.number().int().positive(),
  currency: z.string().default('SAR'),
  orderId: z.string(),
  method: z.enum(['card','applepay','mada']).default('card'),
});

router.post('/create', async (req,res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json(parsed.error);
  const { amount, currency, orderId, method } = parsed.data;

  const provider = process.env.PAYMENTS_PROVIDER || 'tap';
  let providerResp = null;

  if (provider === 'tap') {
    const resp = await fetch('https://api.tap.company/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TAP_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount, currency,
        threeDSecure: true,
        save_card: false,
        description: `TOHFA Order ${orderId}`,
        statement_descriptor: 'TOHFA',
        metadata: { orderId },
        receipt: { email: false, sms: false },
        source: method === 'applepay' ? { id: 'src_apple_pay' } : { id: 'src_all' },
        redirect: { url: process.env.TAP_RETURN_URL || 'http://localhost:3000/checkout/return' }
      })
    });
    providerResp = await resp.json();
  } else if (provider === 'hyperpay') {
    const payload = new URLSearchParams();
    payload.set('entityId', process.env.HYPERPAY_ENTITY_ID || '');
    payload.set('amount', (amount/100).toFixed(2)); // HyperPay expects decimal amounts
    payload.set('currency', currency);
    payload.set('paymentType', 'DB');
    payload.set('merchantTransactionId', orderId);
    const resp = await fetch(`https://eu-test.oppwa.com/v1/checkouts`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.HYPERPAY_PASSWORD}` },
      body: payload
    });
    providerResp = await resp.json();
  }

  const payment = await prisma.payment.create({
    data: {
      provider,
      status: 'created',
      amount, currency, orderId,
      providerRef: providerResp?.id || providerResp?.ndc || null,
      returnUrl: process.env.TAP_RETURN_URL || process.env.HYPERPAY_RETURN_URL || null
    }
  });

  res.json({ payment, providerResp });
});

export default router;