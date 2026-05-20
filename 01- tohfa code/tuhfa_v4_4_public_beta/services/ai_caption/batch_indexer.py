
import os, glob, random, json
def embed_stub(path):
  random.seed(hash(path) % (2**32-1))
  return [random.random() for _ in range(128)]
def run(root='../../content/images', out='embeddings.json'):
  items = []
  for p in glob.glob(os.path.join(root, '**', '*.*'), recursive=True):
    if p.lower().endswith(('.jpg','.jpeg','.png','.webp')):
      items.append({'path': p, 'vec': embed_stub(p)})
  with open(out, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
if __name__ == '__main__':
  run()
