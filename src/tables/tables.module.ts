import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PrismaService } from 'src/middlewares';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TablesController],
  providers: [TablesService, PrismaService],
  imports: [AuthModule],
})
export class TablesModule {}
