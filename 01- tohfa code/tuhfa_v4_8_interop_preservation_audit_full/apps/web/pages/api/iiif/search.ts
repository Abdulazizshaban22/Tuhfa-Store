
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * IIIF Content Search API 2.0 — demo stub
 * Spec: https://iiif.io/api/search/2.0/
 * Query: /api/iiif/search?manifest=<URL>&q=<term>
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = String(req.query.q||'').trim();
  const manifest = String(req.query.manifest||'');
  const id = `https://tuhfa.app/api/iiif/search?manifest=${encodeURIComponent(manifest)}&q=${encodeURIComponent(q)}`;
  const annoPage = {
    "@context": "http://iiif.io/api/search/2/context.json",
    "id": id,
    "type": "AnnotationPage",
    "partOf": [{ "id": manifest, "type": "Manifest" }],
    "items": q ? [{
      "id": id + "#match-1",
      "type": "Annotation",
      "motivation": "supplementing",
      "body": { "type": "TextualBody", "value": q },
      "target": manifest + "#xywh=100,100,200,60"
    }] : []
  };
  res.status(200).json(annoPage);
}
