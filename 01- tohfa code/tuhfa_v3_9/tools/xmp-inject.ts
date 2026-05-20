/**
 * Inject KHR_xmp_json_ld XMP packet into a GLB.
 * Usage:
 *   pnpm add -D @gltf-transform/core @gltf-transform/extensions
 *   npx tsx tools/xmp-inject.ts input.glb output.glb '{"dc:title":"Provenance — Tuhfa","tuhfa:certificate":"CERT-123"}'
 */
import { NodeIO } from '@gltf-transform/core';
import { KHRXMP } from '@gltf-transform/extensions';

const [,, inPath, outPath, jsonLdRaw] = process.argv;
if (!inPath || !outPath || !jsonLdRaw) {
  console.error('Usage: xmp-inject.ts <in.glb> <out.glb> <jsonld>');
  process.exit(1);
}

(async () => {
  const io = new NodeIO().registerExtensions([KHRXMP]);
  const doc = io.read(inPath);

  // Create the XMP extension + packet
  const xmp = doc.createExtension(KHRXMP);
  // @ts-ignore - API allows creating a Packet via xmp.createPacket()
  const packet = xmp.createPacket('provenance');
  packet.setContext({
    "dc": "http://purl.org/dc/elements/1.1/",
    "tuhfa": "https://tuhfa.app/ns#"
  });
  try {
    const data = JSON.parse(jsonLdRaw);
    packet.setPacket(data);
  } catch (e) {
    console.warn('Invalid JSON-LD; writing minimal packet');
    packet.setPacket({ "dc:title": "Tuhfa Asset" });
  }

  // Attach packet to the Root (document-level); you can also attach to nodes/materials if needed.
  doc.getRoot().setExtension(KHRXMP.EXTENSION_NAME, xmp);

  io.write(outPath, doc);
  console.log('✅ Injected XMP into', outPath);
})();