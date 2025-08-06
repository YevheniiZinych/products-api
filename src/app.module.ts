import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Order } from './orders/order.model';
import { Product } from './products/product.model';
import { SessionsGateway } from './sessions/sessions.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Product, Order],
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    OrdersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [SessionsGateway],
})
export class AppModule {}
