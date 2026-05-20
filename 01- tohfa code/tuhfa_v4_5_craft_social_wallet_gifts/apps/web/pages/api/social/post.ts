
import type { NextApiRequest, NextApiResponse } from 'next';
let nextId = 1000;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { content, media } = req.body || {};
  const item = { id: nextId++, user: 'you', content, media, createdAt: new Date().toISOString() };
  res.status(200).json(item);
}
