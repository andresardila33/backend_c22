import { Module } from '@nestjs/common';
import { WaitersModule } from './users/users.module';
import { DishesModule } from './dishes/dishes.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WaitersModule, DishesModule, CategoriesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
