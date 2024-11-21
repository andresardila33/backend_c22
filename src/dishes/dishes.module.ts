import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { PrismaService } from 'src/middlewares/prisma-service';

@Module({
  controllers: [DishesController],
  providers: [DishesService, PrismaService],
})
export class DishesModule {}
