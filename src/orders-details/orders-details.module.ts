import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsController } from './orders-details.controller';
import { PrismaService } from 'src/middlewares';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService, PrismaService],
  imports: [AuthModule],
})
export class OrdersDetailsModule {}
