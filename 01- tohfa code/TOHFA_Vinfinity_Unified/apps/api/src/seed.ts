import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  const artisans = [
    { handle: 'al-sadu', name: 'بيت السدو' },
    { handle: 'asir-art', name: 'فن القط العسيري' },
  ];
  for(const a of artisans){
    await prisma.artisan.upsert({ where:{ handle: a.handle }, update:a, create:a });
  }
  const prods = Array.from({length:12}).map((_,i)=> ({
    externalId: `PRD${100+i}`,
    title: `قطعة حرفية ${i+1}`,
    description: i%2? 'سدو نجدي' : 'نقش عسيري',
    priceSar: (100 + i*5),
    imageUrl: 'https://picsum.photos/seed/'+(i+1)+'/600/600',
    artisanId: 1,
    gtin: (628000000000 + i + 1).toString()
  }));
  for(const p of prods){
    await prisma.product.upsert({ where:{ externalId: p.externalId }, update:p as any, create:p as any });
  }
  console.log('Seeded.');
}
main().finally(()=>prisma.$disconnect());
