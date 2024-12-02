import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  dishName: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;

  @IsArray()
  images: string[];
}
