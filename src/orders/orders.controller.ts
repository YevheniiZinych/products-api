import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import type { IOrder } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(@Body() data: IOrder): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<{ message: string }> {
    await this.orderService.deleteOrder(+id);
    return { message: 'Order and related products deleted' };
  }
}
