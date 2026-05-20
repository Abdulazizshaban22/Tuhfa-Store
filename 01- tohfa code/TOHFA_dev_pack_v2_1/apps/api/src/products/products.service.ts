import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();
  constructor(private ai: AiService) {}

  async ensureEmbedding(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) return null;
    // Create text to embed (name + description)
    const text = [product.name, product.description || ''].join(' — ');
    const embResp = await this.ai.embed([text]);
    const vec = embResp?.vectors?.[0];
    if (!vec) return null;

    // Upsert into real vector table
    await this.prisma.$executeRawUnsafe(
      `INSERT INTO "ProductEmbedding_real"(product_id, embedding) VALUES ($1, $2)
       ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding`,
      productId, vec
    );
    return true;
  }

  async similar(productId: string, limit = 10) {
    // Fetch anchor vector
    const row = await this.prisma.$queryRawUnsafe<any[]>(
      'SELECT embedding FROM "ProductEmbedding_real" WHERE product_id = $1',
      productId
    );
    if (!row?.length) return [];
    const anchor = row[0].embedding;

    // Query by cosine distance (<=>)
    const results = await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT p.id, p.name, p.priceCents, 1 - (e.embedding <=> $1) AS similarity
         FROM "Product" p
         JOIN "ProductEmbedding_real" e ON e.product_id = p.id
        WHERE p.id <> $2
        ORDER BY e.embedding <=> $1
        LIMIT $3`,
      anchor, productId, limit
    );
    return results;
  }
}
