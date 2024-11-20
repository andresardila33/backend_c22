import { Module } from '@nestjs/common';
import { WaitersModule } from './waiters/waiters.module';

@Module({
  imports: [WaitersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
