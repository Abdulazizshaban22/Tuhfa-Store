
import type { NextApiRequest, NextApiResponse } from 'next';
let seed = [
  { id: 2, user: 'almotaharifa', content: 'فيديو سريع لصناعة السدو — التفاصيل مهمّة 💚', createdAt: new Date().toISOString() },
  { id: 1, user: 'hejazi.crafts', content: 'نقش تهامي خشبي — قطعة جديدة في المتجر', createdAt: new Date(Date.now()-864e5).toISOString() },
];
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(seed);
}
