import { Injectable } from '@nestjs/common';
import { CreateOrdersBillDto } from './dto/create-orders-bill.dto';
import { UpdateOrdersBillDto } from './dto/update-orders-bill.dto';

@Injectable()
export class OrdersBillsService {
  create(createOrdersBillDto: CreateOrdersBillDto) {
    return 'This action adds a new ordersBill';
  }

  findAll() {
    return `This action returns all ordersBills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersBill`;
  }

  update(id: number, updateOrdersBillDto: UpdateOrdersBillDto) {
    return `This action updates a #${id} ordersBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersBill`;
  }
}
