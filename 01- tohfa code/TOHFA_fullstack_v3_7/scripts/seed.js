import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const products = [
  { title:'دف المنقوش — نقش نجدي', description:'قطعة تراثية مصنوعة يدويًا', price: 35000, currency:'SAR', imageUrl:'' },
  { title:'مشلح يدوي — غرز سدو', description:'حياكة سدو أصيلة', price: 120000, currency:'SAR', imageUrl:'' },
  { title:'مرود كحل — فضة', description:'إكسسوار نحتي من الفضة', price: 27000, currency:'SAR', imageUrl:'' },
];
for (const p of products){
  await prisma.product.create({ data: p });
}
console.log('Done seeding.');
process.exit(0);