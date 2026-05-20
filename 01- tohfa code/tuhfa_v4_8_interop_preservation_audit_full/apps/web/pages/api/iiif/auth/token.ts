
import type { NextApiRequest, NextApiResponse } from 'next';

/** Issues a demo token. Replace with real SSO (e.g., Nafath/OIDC). */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = { accessToken: "demo-token", expiresIn: 300, tokenType: "Bearer" };
  res.status(200).json(token);
}
