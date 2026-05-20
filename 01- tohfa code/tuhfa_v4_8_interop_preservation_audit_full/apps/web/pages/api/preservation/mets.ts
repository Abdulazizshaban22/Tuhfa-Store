
import type { NextApiRequest, NextApiResponse } from 'next';

/** Minimal METS exporter (demo) — https://www.loc.gov/standards/mets/ */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { assetId = '1' } = req.query as any;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           OBJID="tuhfa:${assetId}">
  <mets:dmdSec ID="dmd1">
    <mets:mdWrap MDTYPE="DC">
      <mets:xmlData>
        <dc:title>سدو نجدي — أصلية</dc:title>
        <dc:identifier>TUHFA-2025-0001</dc:identifier>
        <dc:type>VisualArtwork</dc:type>
      </mets:xmlData>
    </mets:mdWrap>
  </mets:dmdSec>
  <mets:fileSec>
    <mets:fileGrp USE="MASTER">
      <mets:file ID="file1" MIMETYPE="image/tiff" SIZE="123456">
        <mets:FLocat xlink:href="https://images.example.org/master/asset1.tif" LOCTYPE="URL"/>
      </mets:file>
    </mets:fileGrp>
  </mets:fileSec>
</mets:mets>`;
  res.setHeader('content-type','application/xml'); res.status(200).send(xml);
}
