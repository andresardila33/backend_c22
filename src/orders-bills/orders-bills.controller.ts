import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersBillsService } from './orders-bills.service';
import { CreateOrdersBillDto } from './dto/create-orders-bill.dto';
import { UpdateOrdersBillDto } from './dto/update-orders-bill.dto';

@Controller('orders-bills')
export class OrdersBillsController {
  constructor(private readonly ordersBillsService: OrdersBillsService) {}

  @Post()
  create(@Body() createOrdersBillDto: CreateOrdersBillDto) {
    return this.ordersBillsService.create(createOrdersBillDto);
  }

  @Get()
  findAll() {
    return this.ordersBillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersBillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersBillDto: UpdateOrdersBillDto) {
    return this.ordersBillsService.update(+id, updateOrdersBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersBillsService.remove(+id);
  }
}
