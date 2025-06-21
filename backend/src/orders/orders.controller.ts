import { Controller, Post, Body, Get, Query, ParseUUIDPipe, Optional } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('customerId', new ParseUUIDPipe({ optional: true })) customerId?: string) {
    return this.ordersService.findAll(customerId);
  }
} 