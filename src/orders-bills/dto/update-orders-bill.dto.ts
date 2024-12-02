import { PartialType } from '@nestjs/swagger';
import { CreateOrdersBillDto } from './create-orders-bill.dto';

export class UpdateOrdersBillDto extends PartialType(CreateOrdersBillDto) {}
