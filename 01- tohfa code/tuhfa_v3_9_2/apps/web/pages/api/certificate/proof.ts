import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const tokenId = (req.query.tokenId as string) || req.body?.tokenId;
  const tokenURI = (req.query.tokenURI as string) || req.body?.tokenURI;
  if(!tokenId || !tokenURI) return res.status(400).json({error:'tokenId & tokenURI required'});

  try{
    const r = await fetch(tokenURI);
    const buf = Buffer.from(await r.arrayBuffer());
    const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    const now = new Date().toISOString();

    const jsonld = {
      "@context": {
        "tuhfa": "https://tuhfa.app/ns#",
        "dc": "http://purl.org/dc/elements/1.1/"
      },
      "tuhfa:certificate": {
        "tuhfa:tokenId": tokenId,
        "tuhfa:tokenURI": tokenURI,
        "tuhfa:digest": {
          "tuhfa:algo": "sha256",
          "tuhfa:value": sha256
        },
        "dc:created": now
      }
    };
    return res.status(200).json(jsonld);
  }catch(e:any){
    return res.status(500).json({error: e?.message || 'proof failed'});
  }
}