
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Minimal OAI-PMH 2.0 provider (oai_dc only)
 * Spec: https://www.openarchives.org/OAI/openarchivesprotocol.html
 */
function xml(s:string){ return `<?xml version="1.0" encoding="UTF-8"?>\n${s}`; }

const sampleRecords = [
  {
    identifier: "oai:tuhfa.app:asset/1",
    datestamp: "2025-11-01",
    setSpec: "museum:demo",
    dc: {
      title: "سدو نجدي — قطعة تراثية",
      creator: "حرفية سعودية",
      subject: "Textile",
      description: "قطعة سدو أصلية ضمن مقتنيات تحفة.",
      date: "2024",
      type: "VisualArtwork",
      identifier: "TUHFA-2025-0001"
    }
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { verb = "Identify", metadataPrefix = "oai_dc", identifier } = req.query as any;

  if(verb === "Identify"){
    const body = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="Identify">https://tuhfa.app/api/oai</request>
  <Identify>
    <repositoryName>Tuhfa OAI-PMH</repositoryName>
    <baseURL>https://tuhfa.app/api/oai</baseURL>
    <protocolVersion>2.0</protocolVersion>
    <adminEmail>admin@tuhfa.sa</adminEmail>
    <earliestDatestamp>2024-01-01</earliestDatestamp>
    <deletedRecord>transient</deletedRecord>
    <granularity>YYYY-MM-DD</granularity>
  </Identify>
</OAI-PMH>`);
    res.setHeader('content-type','application/xml'); return res.status(200).send(body);
  }

  if(verb === "ListRecords" && metadataPrefix === "oai_dc"){
    const items = sampleRecords.map(r => `
  <record>
    <header>
      <identifier>${r.identifier}</identifier>
      <datestamp>${r.datestamp}</datestamp>
      <setSpec>${r.setSpec}</setSpec>
    </header>
    <metadata>
      <oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
                 xmlns:dc="http://purl.org/dc/elements/1.1/"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
        <dc:title>${r.dc.title}</dc:title>
        <dc:creator>${r.dc.creator}</dc:creator>
        <dc:subject>${r.dc.subject}</dc:subject>
        <dc:description>${r.dc.description}</dc:description>
        <dc:date>${r.dc.date}</dc:date>
        <dc:type>${r.dc.type}</dc:type>
        <dc:identifier>${r.dc.identifier}</dc:identifier>
      </oai_dc:dc>
    </metadata>
  </record>`).join("\n");

    const body = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListRecords" metadataPrefix="oai_dc">https://tuhfa.app/api/oai</request>
  <ListRecords>${items}
  </ListRecords>
</OAI-PMH>`);
    res.setHeader('content-type','application/xml'); return res.status(200).send(body);
  }

  if(verb === "GetRecord" && identifier){
    const r = sampleRecords.find(x => x.identifier === identifier);
    if(!r){
      const body = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="GetRecord" identifier="${identifier}" metadataPrefix="oai_dc">https://tuhfa.app/api/oai</request>
  <error code="idDoesNotExist">Identifier not found</error>
</OAI-PMH>`);
      res.setHeader('content-type','application/xml'); return res.status(404).send(body);
    }
    const item = `
  <record>
    <header>
      <identifier>${r.identifier}</identifier>
      <datestamp>${r.datestamp}</datestamp>
      <setSpec>${r.setSpec}</setSpec>
    </header>
    <metadata>
      <oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
                 xmlns:dc="http://purl.org/dc/elements/1.1/"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
        <dc:title>${r.dc.title}</dc:title>
        <dc:creator>${r.dc.creator}</dc:creator>
        <dc:subject>${r.dc.subject}</dc:subject>
        <dc:description>${r.dc.description}</dc:description>
        <dc:date>${r.dc.date}</dc:date>
        <dc:type>${r.dc.type}</dc:type>
        <dc:identifier>${r.dc.identifier}</dc:identifier>
      </oai_dc:dc>
    </metadata>
  </record>`;

    const body = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="GetRecord" identifier="${identifier}" metadataPrefix="oai_dc">https://tuhfa.app/api/oai</request>
  <GetRecord>${item}
  </GetRecord>
</OAI-PMH>`);
    res.setHeader('content-type','application/xml'); return res.status(200).send(body);
  }

  const bad = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request>https://tuhfa.app/api/oai</request>
  <error code="badVerb">Unsupported or missing verb</error>
</OAI-PMH>`);
  res.setHeader('content-type','application/xml'); return res.status(400).send(bad);
}
