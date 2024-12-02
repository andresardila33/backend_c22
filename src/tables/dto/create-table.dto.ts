import { IsPositive } from 'class-validator';

export class CreateTableDto {
  @IsPositive()
  tableNumber: number;

  @IsPositive()
  capacity: number;
}
