
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Placeholder: استرجع من blockchain أو DB
  res.status(200).json([
    { tokenId:'101', name:'سدو نجدي — 2024', image:'/placeholders/sadu.jpg', certificateUrl:'/cert/101' },
    { tokenId:'214', name:'زخارف تهامية — خشبيات', image:'/placeholders/tehama.jpg', certificateUrl:'/cert/214' },
  ]);
}
