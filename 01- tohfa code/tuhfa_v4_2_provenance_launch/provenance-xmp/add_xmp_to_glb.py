#!/usr/bin/env python3
"""Inject KHR_xmp_json_ld metadata into a GLB for provenance.
Usage:
  python add_xmp_to_glb.py input.glb output.glb metadata.json
"""
import sys, json
from pygltflib import GLTF2, KHR_xmp_json_ld, Metadata

def main():
  if len(sys.argv) < 4:
    print(__doc__); sys.exit(1)
  inp, outp, meta = sys.argv[1:4]
  with open(meta, 'r', encoding='utf-8') as f:
    data = json.load(f)
  gltf = GLTF2().load(inp)

  if not gltf.extensionsUsed:
    gltf.extensionsUsed = []
  if "KHR_xmp_json_ld" not in gltf.extensionsUsed:
    gltf.extensionsUsed.append("KHR_xmp_json_ld")

  if not gltf.extensions:
    gltf.extensions = {}

  xmp_ext = KHR_xmp_json_ld()
  xmp_ext.xmpMetadata = [ Metadata(id="tuhfa_provenance", jsonld=data) ]
  gltf.extensions["KHR_xmp_json_ld"] = xmp_ext

  gltf.save(outp)
  print("Embedded KHR_xmp_json_ld into", outp)

if __name__ == "__main__":
  main()