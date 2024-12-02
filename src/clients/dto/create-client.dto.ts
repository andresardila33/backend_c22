import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;
}
