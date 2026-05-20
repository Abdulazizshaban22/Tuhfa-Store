
export default function Home() {
  return (
    <main style={padding:24}>
      <h1>تحفة v4.8 — Interop + Preservation + Audit</h1>
      <p>باقات التوافق المؤسسي والأرشفة والتتبّع.</p>
      <ul>
        <li><a href="/api/iiif/search?manifest=https://example.org/manifest.json&q=%D8%B3%D8%AF%D9%88">IIIF Content Search (demo)</a></li>
        <li><a href="/api/iiif/auth/info">IIIF Auth info</a> · <a href="/api/iiif/auth/token">Token (demo)</a></li>
        <li><a href="/api/oai?verb=Identify">OAI-PMH Identify</a></li>
        <li><a href="/api/oai?verb=ListRecords&metadataPrefix=oai_dc">OAI-PMH ListRecords (oai_dc)</a></li>
        <li><a href="/api/oai?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:tuhfa.app:asset/1">OAI-PMH GetRecord</a></li>
        <li><a href="/api/preservation/mets?assetId=1">METS</a> · <a href="/api/preservation/premis?assetId=1">PREMIS</a> · <a href="/api/preservation/bagit?assetId=1">BagIt</a></li>
      </ul>
    </main>
  );
}
