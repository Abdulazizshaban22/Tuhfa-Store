/**
 * Run with ts-node or compile: pnpm ts-node apps/api/src/scripts/embed-all.ts
 * Requires AI_BASE and DATABASE_URL configured; Prisma generated.
 */
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();
const AI = process.env.AI_BASE || 'http://localhost:8001';

async function embedText(text: string): Promise<number[] | null> {
  const res = await fetch(AI + '/embed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts: [text] }),
  });
  const json = await res.json().catch(() => null);
  return json?.vectors?.[0] || null;
}

async function main() {
  const products = await prisma.product.findMany({});
  let ok = 0, fail = 0;

  for (const p of products) {
    const text = [p.name, p.description || ''].join(' — ');
    const vec = await embedText(text);
    if (!vec) { fail++; continue; }
    // Upsert into real vector table
    await prisma.$executeRawUnsafe(
      `INSERT INTO "ProductEmbedding_real"(product_id, embedding) VALUES ($1, $2)
       ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding`,
      p.id, vec as any
    );
    ok++;
    if (ok % 20 === 0) console.log('Embedded', ok, 'items ...');
  }
  console.log('Done. OK=', ok, 'Fail=', fail);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
