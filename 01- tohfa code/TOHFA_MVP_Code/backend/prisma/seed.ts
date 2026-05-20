import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){ console.log('Seed placeholder. Use the detailed seed.ts you downloaded earlier.'); }
main().finally(()=>prisma.$disconnect());
