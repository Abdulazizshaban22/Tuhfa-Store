import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeIO } from '@gltf-transform/core';
import { KHRXMP } from '@gltf-transform/extensions';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export const config = { api: { bodyParser: false, sizeLimit: '50mb' } };

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const url = req.query.url as string;
  if(!url) return res.status(400).json({error:'url required'});
  try{
    // Fetch GLB to tmp
    const r = await fetch(url);
    const buf = Buffer.from(await r.arrayBuffer());
    const tmp = path.join(os.tmpdir(), 'tuhfa-xmp.glb');
    fs.writeFileSync(tmp, buf);

    const io = new NodeIO().registerExtensions([KHRXMP]);
    const doc = io.read(tmp);
    const root = doc.getRoot();
    const xmp = root.getExtension(KHRXMP.EXTENSION_NAME) as any;
    let packet:any = null;
    if(xmp){
      // @ts-ignore
      const packets = xmp.listPackets?.() || [];
      if(packets.length){ packet = packets[0].getPacket?.() || null; }
    }
    return res.status(200).json({ ok:true, packet });
  }catch(e:any){
    return res.status(500).json({error: e?.message || 'extract failed'});
  }
}
