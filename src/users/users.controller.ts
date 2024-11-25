import {
  Controller,
  Get,
  //Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los usuarios',
    schema: {
      example: {
        data: [
          {
            id: 'c6b0b22e-c0d2-419a-87e4-75b2a13121e3',
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            email: 'johndoe@example.com',
            isActive: true,
            role: ['manager'],
            createAt: '2024-11-23T00:00:00.000Z',
            updatedAt: '2024-11-23T00:00:00.000Z',
          },
        ],
        meta: {
          totalUsers: 1,
          totalPages: 1,
          page: 1,
        },
      },
    },
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.chef, ValidRoles.user)
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiParam({ name: 'term', type: 'string', description: 'Insert user id' })
  @ApiResponse({
    status: 200,
    description: 'Return user by id',
    schema: {
      example: {
        id: 'c6b0b22e-c0d2-419a-87e4-75b2a13121e3',
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
        email: 'johndoe@example.com',
        isActive: true,
        role: ['manager'],
        createAt: '2024-11-23T00:00:00.000Z',
        updatedAt: '2024-11-23T00:00:00.000Z',
      },
    },
  })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @HttpCode(201)
  @Auth(ValidRoles.manager)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
