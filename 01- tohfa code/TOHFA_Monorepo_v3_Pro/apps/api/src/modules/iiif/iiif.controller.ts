import { Controller, Get, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Controller('iiif')
export class IiifController {
  @Get('manifest/product/:externalId')
  async manifest(@Param('externalId') externalId: string){
    const product = await prisma.product.findUnique({ where:{ externalId }, include:{ iiifItems: true, craftType: true, artisan: true } });
    if(!product) return { error:'not found' };
    const items = (product.iiifItems || []).sort((a:any,b:any)=>a.orderIndex-b.orderIndex).map((it:any, idx:number)=> ({
      id: `https://tohfa.sa/iiif/canvas/${product.externalId}/${idx}`,
      type: "Canvas",
      label: { ar: [it.label || `صورة ${idx+1}`] },
      items: [{
        id:`https://tohfa.sa/iiif/anno/${product.externalId}/${idx}`,
        type:"AnnotationPage",
        items:[{
          id:`https://tohfa.sa/iiif/anno/${product.externalId}/${idx}/image`,
          type:"Annotation",
          motivation:"painting",
          body:{ id: it.imageUrl, type:"Image", format:"image/jpeg" },
          target:`https://tohfa.sa/iiif/canvas/${product.externalId}/${idx}`
        }]
      }]
    }));
    const manifest = {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      id: `https://tohfa.sa/iiif/manifest/product/${product.externalId}`,
      type: "Manifest",
      label: { ar: [product.titleAr] },
      items
    };
    return manifest;
  }
}
