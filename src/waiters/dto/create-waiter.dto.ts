import { IsEmail, IsString } from 'class-validator';

export class CreateWaiterDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsString()
  @IsEmail()
  email: string;
}
