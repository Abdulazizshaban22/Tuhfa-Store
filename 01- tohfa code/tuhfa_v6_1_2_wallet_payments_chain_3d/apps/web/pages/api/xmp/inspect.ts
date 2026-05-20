
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Minimal GLB inspector: reads GLB header and JSON chunk, returns KHR_xmp_json_ld if present.
 * Note: For large files ensure proper streaming; this is a demo.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const url = req.query.url as string;
  if(!url) return res.status(400).json({ error:'url required' });
  try{
    const r = await fetch(url);
    const buf = Buffer.from(await r.arrayBuffer());
    // GLB header: magic(4) = 'glTF', version(4), length(4)
    const magic = buf.toString('utf8',0,4);
    if(magic!=='glTF') return res.status(400).json({ error:'not a GLB' });
    // First chunk header at byte 12: chunkLength(4), chunkType(4)
    const jsonLen = buf.readUInt32LE(12);
    const chunkType = buf.toString('utf8',16,20);
    if(chunkType!=='JSON ') return res.status(400).json({ error:'no JSON chunk' });
    const jsonStr = buf.toString('utf8',20,20+jsonLen);
    const gltf = JSON.parse(jsonStr);
    const xmp = gltf.extensions?.KHR_xmp_json_ld || null;
    return res.status(200).json({ ok:true, xmp, hasExtension: !!xmp });
  }catch(e:any){
    return res.status(500).json({ error: e.message || 'inspect failed' });
  }
}
