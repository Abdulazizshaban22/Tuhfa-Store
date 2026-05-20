/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tohfa.local' },
    update: {},
    create: { email: 'admin@tohfa.local', password: '$2b$10$6FvVh0B8S7Hq2iH4G9iQ6eM4N6Jc1L4LqfK1UZ5t3Xb6k6z3Eqf1e', name: 'Admin', role: 'admin' },
  });
  const craftsman = await prisma.user.upsert({
    where: { email: 'artisan@tohfa.local' },
    update: {},
    create: { email: 'artisan@tohfa.local', password: '$2b$10$6FvVh0B8S7Hq2iH4G9iQ6eM4N6Jc1L4LqfK1UZ5t3Xb6k6z3Eqf1e', name: 'Craftsman One', role: 'craftsman' },
  });

  const p1 = await prisma.product.create({
    data: { name: 'مِبخر تراثي من الفخار', description: 'صنع يدوي من الطين النيء بزخرفة نجدية', priceCents: 12900, craftsmanId: craftsman.id, imageUrl: '' },
  });
  const p2 = await prisma.product.create({
    data: { name: 'سِتارة سدو', description: 'نسيج سدو بألوان تقليدية', priceCents: 24900, craftsmanId: craftsman.id, imageUrl: '' },
  });

  console.log({ admin, craftsman, p1, p2 });
}

main().finally(() => prisma.$disconnect());
