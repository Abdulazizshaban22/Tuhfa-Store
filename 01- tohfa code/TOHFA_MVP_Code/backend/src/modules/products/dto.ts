export class CreateProductDto {
  externalId?: string;
  titleAr!: string;
  status!: 'READY' | 'MADE_TO_ORDER' | 'MUSEUM_GRADE';
  priceSar!: number;
  stockQty?: number;
  madeToOrderLeadDays?: number;
  craftTypeCode!: string;
  artisanExternalId?: string;
  museumExhibitExternalId?: string;
  images?: string[];
}
