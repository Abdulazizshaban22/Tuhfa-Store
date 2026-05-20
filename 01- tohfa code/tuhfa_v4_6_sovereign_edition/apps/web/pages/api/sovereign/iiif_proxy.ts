
import type { NextApiRequest, NextApiResponse } from 'next';

/** Proxy info.json requests if needed; add allowlist & caching in production */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { url } = req.query as { url?: string };
  if(!url) return res.status(400).json({error:'missing url'});
  const upstream = await fetch(url);
  const data = await upstream.json();
  res.status(200).json(data);
}
