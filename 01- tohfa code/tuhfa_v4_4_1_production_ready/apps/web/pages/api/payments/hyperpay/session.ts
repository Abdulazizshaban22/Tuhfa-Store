
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * استبدل هذا الاندبوينت بنداء فعلي إلى HyperPay لإنشاء checkoutId.
 * التدفق: checkoutId -> واجهة الدفع (SDK) -> callback/notification.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount = 100, currency = 'SAR', desc = 'Tuhfa Item' } = JSON.parse(req.body || '{}');
  // TODO: POST to HyperPay /v1/checkouts with entityId + bearer token
  res.status(200).json({ provider: 'hyperpay', checkoutId: 'OPPWA_CHECKOUT_ID', amount, currency, desc });
}
