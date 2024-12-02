import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { PrismaService } from 'src/middlewares/prisma-service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DishesController],
  providers: [DishesService, PrismaService],
  imports: [AuthModule],
})
export class DishesModule {}
