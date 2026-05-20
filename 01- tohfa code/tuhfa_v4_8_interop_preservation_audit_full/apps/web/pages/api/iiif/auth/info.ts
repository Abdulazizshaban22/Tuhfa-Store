
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * IIIF Authorization Flow API 2.0 — info endpoint
 * Spec: https://iiif.io/api/auth/2.0/
 * In production, link this to your real OIDC/Nafath login pages.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const svc = {
    "@context": "http://iiif.io/api/auth/2/context.json",
    "id": "https://tuhfa.app/api/iiif/auth/info",
    "type": "AuthAccessService2",
    "service": [{
      "id": "https://tuhfa.app/api/iiif/auth/token",
      "type": "AuthTokenService2",
      "profile": "http://iiif.io/api/auth/2/token"
    }]
  };
  res.status(200).json(svc);
}
