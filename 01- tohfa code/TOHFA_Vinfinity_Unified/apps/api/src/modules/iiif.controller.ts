import { Controller, Get, Param } from '@nestjs/common';

@Controller('iiif')
export class IiifController {
  @Get('manifest/product/:externalId')
  manifest(@Param('externalId') externalId: string){
    // Minimal IIIF Presentation v3 manifest demo
    return {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      "id": `https://api.local/iiif/manifest/product/${externalId}`,
      "type": "Manifest",
      "label": { "ar": [ `منتج ${externalId}` ] },
      "items": [{
        "id": `https://api.local/iiif/canvas/${externalId}/0`,
        "type": "Canvas",
        "height": 1200, "width": 1200,
        "items": [{
          "id": `https://api.local/iiif/anno/${externalId}/0`,
          "type": "AnnotationPage",
          "items": [{
            "id": `https://api.local/iiif/anno/${externalId}/0/image`,
            "type": "Annotation", "motivation":"painting",
            "body": { "id":"https://picsum.photos/1200/1200", "type":"Image", "format":"image/jpeg" },
            "target": `https://api.local/iiif/canvas/${externalId}/0`
          }]
        }]
      }]
    }
  }
}
