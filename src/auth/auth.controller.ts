import {
  Controller,
  //Get,
  Post,
  Body,
  HttpCode,
  //Patch,
  //Param,
  //Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { UpdateAuthDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  @ApiBody({
    type: CreateUserDto,
    required: true,
    examples: {
      user: {
        summary: 'Example user',
        value: {
          firstName: 'John',
          lastName: 'Doe',
          userName: 'johndoe',
          password: 'Password123!',
          email: 'johndoe@example.com',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
        email: 'johndoe@example.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2YjBiMjJlLWMwZDItNDE5YS04N2U0LTc1YjJhMTMxMjFlMyIsImlhdCI6MTczMjM3NDI0NCwiZXhwIjoxNzMyMzg4NjQ0fQ.b2dbiBXz1kSujjoqu1RHbXrWj85lXO94rAHQmvhdo3A',
      },
    },
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    required: true,
    examples: {
      user: {
        summary: 'Example user',
        value: {
          email: 'johndoe@example.com',
          password: 'Password123!',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        id: 'c6b0b22e-c0d2-419a-87e4-75b2a13121e3',
        email: 'johndoe@example.com',
        password:
          '$2b$10$UlAJITfqvO0Y6L4czdxalODGKjhdaz5cV8u0vEUzN8NmwYzyRL4M.',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2YjBiMjJlLWMwZDItNDE5YS04N2U0LTc1YjJhMTMxMjFlMyIsImlhdCI6MTczMjM3NTI1NywiZXhwIjoxNzMyMzg5NjU3fQ.Qh6SC9OVmkjVNVNAq2EcvSImLWk_HM3RS5DpEK9aYvE',
      },
    },
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
