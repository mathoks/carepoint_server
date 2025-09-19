import { OrderService } from './order.service';
import { orders } from '@prisma/client';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { createOrderDto } from 'src/types';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('/:id/getAllOrder')
  async getUserOrders(
    @Param('id') userID: orders['OrderID'],
  ): Promise<orders[]> {
    const data = await this.orderService.getAllOrder(userID);
    return data ?? [];
  }

  @Get('/:user_id/:orderId/getOrder')
  async getOrderByID(
    @Param('user_id') user_id: orders['user_id'],
    @Param('orderId') OrderID: orders['OrderID'],
  ): Promise<orders> {
    const data = await this.orderService.getOrderByIDs({ OrderID, user_id });
    return data ?? null;
  }

  @Post('/:id/createOrder')
  async createOrder(
    @Body('body') Data: createOrderDto,
  ): Promise<orders | object> {
    console.log(Data, 'data');
    const data = await this.orderService.createOrder(
      { ...Data.orderData },
      Data.orderItemData,
    );
    return data ?? { order: null };
  }
}
