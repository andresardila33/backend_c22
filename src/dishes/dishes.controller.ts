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
import { CreateDishDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { UpdateWaiterDto } from 'src/waiters/dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.dishesService.findAll(paginationDto);
  }

  @HttpCode(200)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.dishesService.findOne(term);
  }

  @HttpCode(201)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDishesDto: UpdateWaiterDto,
  ) {
    return this.dishesService.update(id, updateDishesDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dishesService.remove(id);
  }
}
