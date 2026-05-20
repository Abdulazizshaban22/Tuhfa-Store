
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * استبدل هذا الاندبوينت بنداء فعلي إلى Tap لإنشاء Session/Charge.
 * المزوّد يوفّر Apple Pay + mada — تأكد من التمكين من لوحة Tap.
 * راجع وثائق Tap لحقول الطلب (amount, currency, source, customer, merchant).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount = 100, currency = 'SAR', desc = 'Tuhfa Item' } = JSON.parse(req.body || '{}');
  // TODO: POST to Tap API with secret key from env and return redirect / SDK payload
  res.status(200).json({ provider: 'tap', session: 'mock_session_id', amount, currency, desc, methods: ['APPLEPAY','MADA'] });
}
