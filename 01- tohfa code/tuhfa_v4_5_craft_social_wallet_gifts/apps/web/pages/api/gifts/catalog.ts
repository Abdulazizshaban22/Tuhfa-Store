
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { id:1, title:'مجموعة سدو كلاسيكية', price:799, image:'/placeholders/sadu.jpg' },
    { id:2, title:'نقش حجازي مطعّم', price:1199, image:'/placeholders/hijaz.jpg' },
    { id:3, title:'خشبيات تهامية', price:999, image:'/placeholders/tehama.jpg' },
  ]);
}
