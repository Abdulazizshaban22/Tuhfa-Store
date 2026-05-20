export class CreateOrderDto {
  items: { productId: string; quantity: number }[];
  provider?: 'stripe' | 'tap';
  returnUrl?: string;
}
