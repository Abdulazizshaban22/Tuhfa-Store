import { PrismaClient, AppRole } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  // Example seed: one region, craft, artisan, product
  await prisma.region.upsert({
    where: { code: 'MKK' },
    update: {},
    create: { code: 'MKK', nameAr: 'منطقة مكة المكرمة', capitalAr: 'مكة' }
  });
  await prisma.craftType.upsert({
    where: { code: 'SADO' },
    update: {},
    create: { code: 'SADO', nameAr: 'السدو', descriptionAr: 'حرفة نسج السدو', patterns: ['مثلثات','خطوط'], materials: ['صوف','قطن'] }
  });
  const user = await prisma.user.upsert({
    where: { email: 'admin@tohfa.sa' },
    update: {},
    create: { email: 'admin@tohfa.sa', name: 'Admin', role: AppRole.ADMIN }
  });
  const artisan = await prisma.artisan.upsert({
    where: { externalId: 'ART001' },
    update: {},
    create: { externalId: 'ART001', nameAr: 'حرفي جدة', storeHandle: 'jeddah-artisan', ownerId: user.id, specialties: ['سدو'], regionCode: 'MKK' }
  });
  await prisma.product.upsert({
    where: { externalId: 'PRD001' },
    update: {},
    create: {
      externalId: 'PRD001', titleAr: 'سجادة سدو يدوية', status: 'READY', priceSar: 450, stockQty: 3,
      craftTypeCode: 'SADO', artisanId: artisan.id, images: []
    }
  });
  console.log('Seeded basic data');
}
main().finally(()=>prisma.$disconnect());
