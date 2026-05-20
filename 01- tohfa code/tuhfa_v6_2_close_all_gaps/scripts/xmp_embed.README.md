
# XMP Embed Pipeline (KHR_xmp_json_ld)
Use glTF-Transform CLI to inject XMP JSON-LD into a .glb:
1) npm i -g @gltf-transform/cli
2) Create xmp.json (JSON-LD) for the asset (issuer, fixity SHA-256, owner, tokenId, contract, issuedAt).
3) gltf-transform copy input.glb output.glb --xmp xmp.json
Docs: https://gltf-transform.dev/modules/extensions/classes/KHRXMP
