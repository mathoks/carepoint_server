import { Injectable } from '@nestjs/common';
import { cart, cart_item, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async getCart(cartUnique: Prisma.cartWhereUniqueInput): Promise<cart | null> {
    return this.prisma.cart.findUnique({
      where: {
        userID: cartUnique.userID,
      },
      include: {
        cart_item: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
            product_variant: {
              select: {
                variant_name: true,
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async addCartItem(
    cartItemData: Prisma.cart_itemCreateInput,
    userId: any,
  ): Promise<cart_item> {
    return this.prisma.$transaction(async (tx) => {
      const hasCart = await this.getCart(userId);
      if (!hasCart) {
        await tx.cart.create({
          data: userId,
        });
      }
      const cartItem = await tx.cart_item.create({
        data: cartItemData,
      });
      return cartItem;
    });
  }

  async updateCartItem(
    cartItemData: Prisma.cart_itemCreateInput,
    userID: Prisma.cartWhereUniqueInput,
    cartData: Prisma.cartUncheckedCreateInput,
    cartItemID: { CartItemID: string; ProductID: string; variant_id: string },
  ): Promise<cart_item> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const hasCart = await this.getCart(userID);
        if (!hasCart) {
          const dd = await tx.cart.create({
            data: cartData,
          });
          const item = await tx.cart_item.create({
            data:
              cartItemData.isVariant !== 'false'
                ? {
                    ...cartItemData,
                    cart: { connect: { CartID: dd.CartID } },
                    product_variant: { connect: { id: cartItemID.variant_id } },
                  }
                : {
                    ...cartItemData,
                    cart: { connect: { CartID: dd.CartID } },
                    product: { connect: { id: cartItemID.ProductID } },
                  },
          });
          return item;
        } else {
          const updataedItem = await tx.cart_item.upsert({
            where: { CartItemID: cartItemID.CartItemID },
            update: {
              Quantity: cartItemData.Quantity,
              TotalPrice: cartItemData.TotalPrice,
            },
            create:
              cartItemData.isVariant !== 'false'
                ? {
                    ...cartItemData,
                    product_variant: { connect: { id: cartItemID.variant_id } },
                    cart: { connect: { CartID: cartData.userID } },
                  }
                : {
                    ...cartItemData,
                    product: { connect: { id: cartItemID.ProductID } },
                    cart: { connect: { CartID: cartData.userID } },
                  },
          });
          return updataedItem;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    });
  }
  async deleteCartItem(cartItemData: string, cartId: string): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const userCart = await tx.cart.findUnique({
          where: { CartID: cartId },
          select: {
            cart_item: {
              select: {
                CartItemID: true,
              },
            },
            CartID: true,
          },
        });
        await tx.cart_item.delete({
          where: {
            CartItemID: userCart.cart_item.find(
              (c) => c.CartItemID === cartItemData,
            ).CartItemID,
          },
        });
        if (userCart.cart_item.length === 0) {
          console.log(userCart.cart_item.length);
          await tx.cart.delete({
            where: {
              CartID: userCart.CartID,
            },
          });
        }
        console.log(userCart.cart_item.length);
        return true;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    });
  }
}
