import type { NextApiRequest, NextApiResponse } from 'next';

/** Stub: يرجع وصفًا بسيطًا للصورة المرفوعة (للتجربة فقط) */
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  return res.status(200).json({
    caption: "قطعة حرفية سعودية بنقوش تراثية — وصف تجريبي (v3.8).",
    confidence: 0.42
  });
}
