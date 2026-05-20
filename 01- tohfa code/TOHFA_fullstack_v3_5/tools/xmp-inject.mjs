
#!/usr/bin/env node
// Inject basic XMP metadata (KHR_xmp_json_ld) into a glTF/GLB using glTF-Transform
// Usage: node xmp-inject.mjs input.glb output.glb --title "..." --creator "..." --license "..."
import fs from 'node:fs';
import path from 'node:path';
import { NodeIO } from '@gltf-transform/core';
import { KHRXMP } from '@gltf-transform/extensions';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node xmp-inject.mjs input.glb output.glb [--title ...] [--creator ...] [--license ...]');
  process.exit(1);
}
const inFile = args[0], outFile = args[1];
function getFlag(name, def='') {
  const i = args.indexOf(name);
  return i>=0 ? String(args[i+1]||'') : def;
}
const title = getFlag('--title','Tohfa Asset');
const creator = getFlag('--creator','Unknown');
const license = getFlag('--license','CC-BY-4.0');

const io = new NodeIO().registerExtensions([KHRXMP]);
const doc = io.read(inFile);
const xmp = doc.createExtension(KHRXMP);
const packet = xmp.createPacket();

packet.setContext({
  // Minimal common namespaces
  dc: 'http://purl.org/dc/elements/1.1/',
  xmpRights: 'http://ns.adobe.com/xap/1.0/rights/',
  cc: 'http://creativecommons.org/ns#'
});

packet.setProperty('dc:title', title);
packet.setProperty('dc:creator', [creator]);
packet.setProperty('cc:license', license);
packet.setProperty('xmpRights:Marked', true);

// Attach to document root (applies to the whole asset)
xmp.assignRoot(packet);

io.write(outFile, doc);
console.log('Injected KHR_xmp_json_ld metadata →', path.basename(outFile));
