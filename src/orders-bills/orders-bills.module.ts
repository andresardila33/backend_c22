import { Module } from '@nestjs/common';
import { OrdersBillsService } from './orders-bills.service';
import { OrdersBillsController } from './orders-bills.controller';
import { PrismaService } from 'src/middlewares';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersBillsController],
  providers: [OrdersBillsService, PrismaService],
  imports: [AuthModule],
})
export class OrdersBillsModule {}
