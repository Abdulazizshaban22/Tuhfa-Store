
import type { NextApiRequest, NextApiResponse } from 'next';

/** بروكسي مبسّط لتمرير info.json من خادم IIIF مع CORS */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    const { url } = req.query as { url?: string };
    if(!url) return res.status(400).json({error:'missing url'});
    const up = await fetch(String(url));
    const txt = await up.text();
    res.setHeader('content-type', up.headers.get('content-type') || 'application/json');
    res.setHeader('access-control-allow-origin', '*');
    res.status(up.status).send(txt);
  }catch(e:any){
    res.status(500).json({error:e?.message||'proxy_error'});
  }
}
