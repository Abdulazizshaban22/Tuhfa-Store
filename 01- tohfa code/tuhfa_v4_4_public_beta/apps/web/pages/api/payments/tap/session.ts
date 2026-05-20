
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ provider: 'tap', session: 'mock_session_id', method: ['APPLEPAY','MADA'] });
}
