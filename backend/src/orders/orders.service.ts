import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private customersService: CustomersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items: itemsData } = createOrderDto;

    const customer = await this.customersService.findOne(customerId);

    const items = this.orderItemsRepository.create(itemsData);
    
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = this.ordersRepository.create({
      customer,
      items,
      totalAmount,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(customerId?: string): Promise<Order[]> {
    const queryOptions: any = {
      relations: ['customer', 'items'],
  };

  if (customerId) {
      queryOptions.where = { customer: { id: customerId } };
  }

  return this.ordersRepository.find(queryOptions);
  }
} 