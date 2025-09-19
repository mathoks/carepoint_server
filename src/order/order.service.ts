import { Injectable } from '@nestjs/common';
import { orders, order_details, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async getOrder(
    orderUnique: Prisma.ordersWhereUniqueInput,
  ): Promise<orders | null> {
    return this.prisma.orders.findUnique({
      where: {
        OrderID: orderUnique.OrderID,
      },
      include: {
        order_details: true,
      },
    });
  }

  async getOrderByIDs(
    orderUnique: Prisma.ordersOrder_item_uniqueCompoundUniqueInput,
  ): Promise<orders | null> {
    return this.prisma.orders.findUnique({
      where: {
        order_item_unique: orderUnique,
      },
      include: {
        order_details: {
          select: {
            OrderDetailID: true,
            product_id: true,
            order_id: true,
            UnitPrice: true,
            Discount: true,
            Quantity: true,
            total_price: true,
            isVariant: true,
            variant_id: true,
            product: { select: { name: true, price: true } },
            product_variant: {
              select: { variant_name: true },
            },
          },
        },
      },
    });
  }
  async getAllOrder(userId: orders['user_id']): Promise<orders[]> {
    return this.prisma.orders.findMany({
      where: {
        user_id: userId,
      },
      include: {
        order_details: true,
      },
    });
  }

  async createOrder(
    orderData: Prisma.ordersCreateInput,
    cartItemData: Omit<order_details, 'OrderDetailID, order_id'>[],
  ): Promise<orders> {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: orderData,
      });
      for (const item of cartItemData) {
        await tx.order_details.create({
          data: {
            order_id: order.OrderID,
            ...item,
          },
        });
      }
      return order;
    });
  }

  async modifyOrder(
    orderItemData: Prisma.order_detailsCreateInput,
    orderId: Prisma.ordersWhereUniqueInput,
    orderData: Prisma.ordersCreateInput,
  ): Promise<orders> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const hasOrder = await this.getOrder(orderId);
        if (!hasOrder) {
          throw new Error('Order not found');
        }
        const updatedOrder = await tx.orders.update({
          where: { OrderID: orderId.OrderID },
          data: {
            ...orderData,
          },
        });
        return updatedOrder;
      } catch (error) {
        throw new Error('Failed to update order: ' + error.message);
      }
    });
  }
}
