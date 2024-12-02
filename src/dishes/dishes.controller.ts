import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto, UpdateDishDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @HttpCode(201)
  @Auth(ValidRoles.manager)
  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({
    status: 200,
    description: 'Return all the dishes in the menu',
    schema: {
      example: {
        data: [
          {
            id: 'de15cee6-faf4-4303-8b53-ad547cdd4abb',
            dishName: 'Pastas Napolitana',
            price: 90.53,
            description: 'Plato Italiano de alta cocina',
            categoryId: 'f2b2ffca-1d7a-4e44-b503-b862f6ca4acf',
            categoryName: 'Comida Mediterranea',
            createAt: '2024-11-23T00:00:00.000Z',
            updatedAt: '2024-11-23T00:00:00.000Z',
          },
        ],
        meta: {
          totalDishes: 1,
          totalPages: 1,
          page: 1,
        },
      },
    },
  })
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.chef, ValidRoles.user)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.dishesService.findAll(paginationDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get one dish by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a single dish by id',
    schema: {
      example: {
        id: 'de15cee6-faf4-4303-8b53-ad547cdd4abb',
        dishName: 'Pastas Napolitana',
        price: 90.53,
        description: 'Plato Italiano de alta cocina',
        categoryId: 'f2b2ffca-1d7a-4e44-b503-b862f6ca4acf',
        categoryName: 'Comida Mediterranea',
        createAt: '2024-11-23T00:00:00.000Z',
        updatedAt: '2024-11-23T00:00:00.000Z',
      },
    },
  })
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.chef, ValidRoles.user)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.dishesService.findOne(term);
  }

  @HttpCode(201)
  @Auth(ValidRoles.manager)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDishDto: UpdateDishDto,
  ) {
    return this.dishesService.update(id, updateDishDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dishesService.remove(id);
  }
}
