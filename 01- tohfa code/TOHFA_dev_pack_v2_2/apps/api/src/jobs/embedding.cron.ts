import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { AiService } from '../ai/ai.service';

@Injectable()
export class EmbeddingCronJob {
  private prisma = new PrismaClient();
  private logger = new Logger(EmbeddingCronJob.name);

  constructor(private ai: AiService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async handleCron() {
    this.logger.log('EmbeddingCron: start');
    const products = await this.prisma.product.findMany({ where: { updatedAt: { gt: new Date(Date.now() - 1000*60*60*24*7) } } });
    for (const p of products) {
      const text = [p.name, p.description || ''].join(' — ');
      const emb = await this.ai.embed([text]).catch(() => null);
      const vec = (emb as any)?.vectors?.[0];
      if (!vec) continue;
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO "ProductEmbedding_real"(product_id, embedding) VALUES ($1, $2)
         ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding`,
        p.id, vec as any
      );
    }
    this.logger.log('EmbeddingCron: done');
  }
}
