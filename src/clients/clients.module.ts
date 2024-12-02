import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/middlewares';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
  imports: [AuthModule],
})
export class ClientsModule {}
