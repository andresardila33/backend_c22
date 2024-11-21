import { Module } from '@nestjs/common';
import { WaitersModule } from './waiters/waiters.module';
import { DishesModule } from './dishes/dishes.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [WaitersModule, DishesModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
