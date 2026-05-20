import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const amount = Number(req.body?.amount || 1);
  const apiKey = process.env.TAP_API_KEY;
  const publicKey = process.env.TAP_PUBLIC_KEY;
  if(!apiKey || !publicKey) return res.status(400).json({error:'Tap keys missing'});

  // Minimal payload to Tap Charges API (see docs)
  const payload:any = {
    amount,
    currency: "SAR",
    threeDSecure: true,
    save_card: false,
    description: "Tuhfa order",
    metadata: { platform: "tuhfa", env: "dev" },
    source: { id: "src_all" }, // Let Tap show supported PMs including ApplePay (if enabled on account)
    redirect: { url: process.env.NEXT_PUBLIC_APP_URL + "/checkout" },
    post: { url: process.env.NEXT_PUBLIC_APP_URL + "/api/payments/tap/webhook" }
  };

  try {
    const r = await fetch("https://api.tap.company/v2/charges", {
      method:"POST",
      headers:{
        "content-type":"application/json",
        "authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    return res.status(200).json({
      id: j.id,
      status: j.status,
      amount: j.amount,
      currency: j.currency,
      redirect_url: j.transaction?.url || j.redirect?.url || null
    });
  } catch (e:any){
    return res.status(500).json({error:e?.message || "Tap create error"});
  }
}
