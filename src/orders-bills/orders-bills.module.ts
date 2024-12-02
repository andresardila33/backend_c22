import { Module } from '@nestjs/common';
import { OrdersBillsService } from './orders-bills.service';
import { OrdersBillsController } from './orders-bills.controller';

@Module({
  controllers: [OrdersBillsController],
  providers: [OrdersBillsService],
})
export class OrdersBillsModule {}
