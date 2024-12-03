import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersBillsService } from './orders-bills.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import { CreateOrdersBillDto, UpdateOrdersBillDto } from './dto';
import { PaginationDto } from 'src/common/dto';

@ApiTags('orders-bills')
@Controller('orders-bills')
export class OrdersBillsController {
  constructor(private readonly ordersBillsService: OrdersBillsService) {}

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Post()
  create(@Body() createOrdersBillsDto: CreateOrdersBillDto) {
    return this.ordersBillsService.create(createOrdersBillsDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user, ValidRoles.chef)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersBillsService.findAll(paginationDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.ordersBillsService.findOne(term);
  }

  @HttpCode(201)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrdersBillDto: UpdateOrdersBillDto,
  ) {
    return this.ordersBillsService.update(id, updateOrdersBillDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersBillsService.remove(id);
  }
}
