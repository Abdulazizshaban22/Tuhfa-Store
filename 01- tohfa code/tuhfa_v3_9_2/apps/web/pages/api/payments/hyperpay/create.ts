import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const amount = Number(req.body?.amount || 1);
  const entityId = process.env.HYPERPAY_ENTITY_ID;
  const bearer = process.env.HYPERPAY_AUTH_BEARER;
  const testMode = process.env.HYPERPAY_TEST_MODE==='true';
  if(!entityId || !bearer) return res.status(400).json({error:'HyperPay keys missing'});

  const base = testMode ? "https://eu-test.oppwa.com" : "https://oppwa.com";
  const form = new URLSearchParams({
    entityId,
    amount: amount.toFixed(2),
    currency: "SAR",
    paymentType: "DB"
  });

  try {
    const r = await fetch(`${base}/v1/checkouts`, {
      method:"POST",
      headers:{ "Authorization": `Bearer ${bearer}`, "content-type": "application/x-www-form-urlencoded" },
      body: form
    });
    const j = await r.json();
    // Client should render payment widget using checkoutId
    return res.status(200).json({ checkoutId: j.id, base });
  } catch (e:any){
    return res.status(500).json({error:e?.message || "HyperPay create error"});
  }
}
