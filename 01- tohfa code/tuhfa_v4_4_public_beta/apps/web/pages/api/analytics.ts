
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    salesSAR: 128000,
    visitors: 5400,
    topStyles: ['Najdi','Hejazi','Asiri'],
    topMuseums: ['National Museum','Hijaz Heritage'],
    trending: ['سدو','نقش تهامي','خشبيات'],
  });
}
