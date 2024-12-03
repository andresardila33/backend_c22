import { Module } from '@nestjs/common';
import { WaitersModule } from './users/users.module';
import { DishesModule } from './dishes/dishes.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TablesModule } from './tables/tables.module';
import { OrdersBillsModule } from './orders-bills/orders-bills.module';
import { OrdersDetailsModule } from './orders-details/orders-details.module';

@Module({
  imports: [WaitersModule, DishesModule, CategoriesModule, AuthModule, ClientsModule, TablesModule, OrdersBillsModule, OrdersDetailsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
