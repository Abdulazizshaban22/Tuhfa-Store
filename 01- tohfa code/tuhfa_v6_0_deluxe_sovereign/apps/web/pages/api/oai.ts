
import type { NextApiRequest, NextApiResponse } from 'next';
function xml(s:string){ return `<?xml version="1.0" encoding="UTF-8"?>\n${s}`; }
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { verb="Identify" } = req.query as any;
  if(verb !== "Identify"){
    const bad = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"><error code="badVerb">Only Identify in this stub</error></OAI-PMH>`);
    res.setHeader('content-type','application/xml'); return res.status(400).send(bad);
  }
  const body = xml(`<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
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
