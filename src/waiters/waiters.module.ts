import { Module } from '@nestjs/common';
import { WaitersService } from './waiters.service';
import { WaitersController } from './waiters.controller';
import { PrismaService } from 'src/middlewares/prisma-service';

@Module({
  controllers: [WaitersController],
  providers: [WaitersService, PrismaService],
})
export class WaitersModule {}
