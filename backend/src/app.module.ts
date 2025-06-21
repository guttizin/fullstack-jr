import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Customer } from './customers/entities/customer.entity';
import { CustomersModule } from './customers/customers.module';
import { ProductStandardizationService } from './products/product-standardization.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get<string>('DB_HOST'),
      //   port: configService.get<number>('DB_PORT'),
      //   username: configService.get<string>('DB_USERNAME'),
      //   password: configService.get<string>('DB_PASSWORD'),
      //   database: configService.get<string>('DB_DATABASE'),
      //   entities: [Order, OrderItem, Customer],
      //   synchronize: true, // Only for development. Use migrations in production.
      // }),
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_DATABASE || "ecommerce",
        entities: [Order, OrderItem, Customer],
        synchronize: true, // Only for development. Use migrations in production.
      }),
    }),
    ProductsModule,
    OrdersModule,
    CustomersModule,
  ],
  providers: [ProductStandardizationService],
})
export class AppModule {} 