import { DataSource } from 'typeorm';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Customer } from './customers/entities/customer.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ecommerce',
    synchronize: true,
    logging: true,
    entities: [Order, OrderItem, Customer],
    migrations: ['./migrations/*.ts'],
});