import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const config = { api: { bodyParser: false } };

function buffer(req:NextApiRequest):Promise<Buffer>{
  return new Promise((resolve, reject)=>{
    const chunks:Buffer[] = [];
    req.on('data', (c)=>chunks.push(c));
    req.on('end', ()=> resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).end();
  const secret = process.env.TAP_WEBHOOK_SECRET || '';
  const raw = await buffer(req);
  // Example HMAC check if header provided (implementation may vary by Tap config)
  const sig = req.headers['x-tap-signature'] as string | undefined;
  if(secret && sig){
    const mac = crypto.createHmac('sha256', secret).update(raw).digest('base64');
    if(mac !== sig){
      return res.status(401).end('Invalid signature');
    }
  }
  // Parse JSON
  let evt:any = {};
  try{ evt = JSON.parse(raw.toString('utf8')); }catch{}
  // TODO: update order status in DB
  return res.status(200).json({ok:true, received: evt?.id || true});
}
