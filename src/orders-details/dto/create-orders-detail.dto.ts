import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrdersDetailDto {
  @IsPositive()
  quantity: number;

  @IsNumber({
    maxDecimalPlaces: 3,
  })
  unitPrice: number;

  @IsUUID()
  orderBillId: string;

  @IsUUID()
  dishId: string;
}
