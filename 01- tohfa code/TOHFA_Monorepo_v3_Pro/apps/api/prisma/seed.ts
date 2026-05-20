import { PrismaClient, AppRole } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  await prisma.region.upsert({ where:{code:'ASR'}, update:{}, create:{ code:'ASR', nameAr:'عسير', capitalAr:'أبها' }});
  await prisma.craftType.upsert({ where:{code:'QAT_ASIRI'}, update:{}, create:{ code:'QAT_ASIRI', nameAr:'القط العسيري', descriptionAr:'زخرفة جدران تراثية', patterns:['ألوان هندسية'], materials:['دهان','جبس'] }});
  const user = await prisma.user.upsert({ where:{email:'admin@tohfa.sa'}, update:{}, create:{ email:'admin@tohfa.sa', name:'Admin', role:AppRole.ADMIN } });
  const artisan = await prisma.artisan.upsert({ where:{externalId:'ART100'}, update:{}, create:{ externalId:'ART100', nameAr:'حرفية عسير', storeHandle:'asiri-art', ownerId:user.id, specialties:['قط عسيري'], regionCode:'ASR' } });
  const p = await prisma.product.upsert({ where:{externalId:'PRD100'}, update:{}, create:{ externalId:'PRD100', sku:'628000000001', titleAr:'لوحة قط عسيري', status:'READY', priceSar:650, stockQty:2, craftTypeCode:'QAT_ASIRI', artisanId: artisan.id, images:[] }});
  await prisma.gs1Map.upsert({ where:{gtin: '628000000001'}, update:{ productId: p.id }, create:{ gtin:'628000000001', productId:p.id } });
  await prisma.iiifItem.createMany({ data:[
    { productId:p.id, label:'صورة 1', imageUrl:'https://example.com/iiif/asiri1.jpg', orderIndex:0 },
    { productId:p.id, label:'صورة 2', imageUrl:'https://example.com/iiif/asiri2.jpg', orderIndex:1 }
  ]});
  console.log('Seed completed');
}
main().finally(()=>prisma.$disconnect());
