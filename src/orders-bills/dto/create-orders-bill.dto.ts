import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrdersBillDto {
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  total: number;

  @IsUUID()
  clientId: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  tableId: string;
}
