
import type { NextApiRequest, NextApiResponse } from 'next';

/** Minimal PREMIS exporter (demo) — https://www.loc.gov/standards/premis/ */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { assetId = '1' } = req.query as any;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<premis:premis xmlns:premis="http://www.loc.gov/premis/v3">
  <premis:object>
    <premis:objectIdentifier>
      <premis:objectIdentifierType>local</premis:objectIdentifierType>
      <premis:objectIdentifierValue>tuhfa:${assetId}</premis:objectIdentifierValue>
    </premis:objectIdentifier>
    <premis:objectCharacteristics>
      <premis:fixity>
        <premis:messageDigestAlgorithm>SHA-256</premis:messageDigestAlgorithm>
        <premis:messageDigest>demo_checksum_sha256</premis:messageDigest>
      </premis:fixity>
      <premis:size>123456</premis:size>
      <premis:formatName>image/tiff</premis:formatName>
    </premis:objectCharacteristics>
  </premis:object>
</premis:premis>`;
  res.setHeader('content-type','application/xml'); res.status(200).send(xml);
}
