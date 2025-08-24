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
                prodimage: {
                  select: {
                    image: true,
                  },
                },
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
                variant_image: {
                  select: {
                    image: true,
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
    cartItemID: {
      CartItemID: cart_item['CartItemID'];
      ProductID: cart_item['ProductID'];
      variant_id: cart_item['variant_id'];
    },
  ): Promise<cart_item> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const hasCart = await this.getCart(userID);
        if (!hasCart) {
          const dd = await tx.cart.create({
            data: cartData,
          });
          const item = await tx.cart_item.create({
            data: {
              ...cartItemData,
              cart: {
                connect: { CartID: cartData.userID },
              },
              product: {
                connect: { id: cartItemID.ProductID },
              },
              ...(cartItemID?.variant_id && {
                product_variant: {
                  connect: { id: cartItemID.variant_id },
                },
              }),
            },
            // cartItemData.isVariant.toString() !== 'false'
            //   ? {
            //       ...cartItemData,
            //       cart: { connect: { CartID: dd.CartID } },
            //       product_variant: { connect: { id: cartItemID.variant_id } },
            //       product: { connect: { id: cartItemID.ProductID } },
            //     }
            //   : {
            //       ...cartItemData,
            //       cart: { connect: { CartID: dd.CartID } },
            //       product: { connect: { id: cartItemID.ProductID } },
            //     },
          });
          return item;
        } else {
          const updataedItem = await tx.cart_item.upsert({
            where: { CartItemID: cartItemID.CartItemID },
            update: {
              Quantity: cartItemData.Quantity,
              TotalPrice: cartItemData.TotalPrice,
            },
            create: {
              ...cartItemData,
              cart: {
                connect: { CartID: cartData.userID },
              },
              product: {
                connect: { id: cartItemID.ProductID },
              },
              ...(cartItemID?.variant_id && {
                product_variant: {
                  connect: { id: cartItemID.variant_id },
                },
              }),
            },
            // cartItemData.isVariant.toString() !== 'false'
            //   ? {
            //       ...cartItemData,
            //       product_variant: { connect: { id: cartItemID.variant_id } },
            //       cart: { connect: { CartID: cartData.userID } },
            //       product: { connect: { id: cartItemID.ProductID } },
            //     }
            //   : {
            //       ...cartItemData,
            //       product: { connect: { id: cartItemID.ProductID } },
            //       cart: { connect: { CartID: cartData.userID } },
            //     },
          });
          return updataedItem;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    });
  }
  async deleteCartItem(
    cartItemData: cart_item['CartItemID'],
    cartId: string,
  ): Promise<cart_item['CartItemID']> {
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
          await tx.cart.delete({
            where: {
              CartID: userCart.CartID,
            },
          });
        }
        return cartItemData;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    });
  }
  async mergeCart(
    cartItemData: (Omit<cart_item, 'variant_id'> &
      Partial<Pick<cart_item, 'variant_id'>>)[],
    cartId: cart['userID'] | any,
  ): Promise<cart> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const userCart = await tx.cart.findUnique({
          where: { CartID: cartId },
          include: {
            cart_item: true,
          },
        });
        if (!userCart) {
          const cart = await tx.cart.create({
            data: cartId,
          });
          if (!cart) {
            throw new Error('Cart creation failed');
          }
          for (const item of cartItemData) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { variant_id, ProductID, CartID, ...rest } = item;
            await tx.cart_item.create({
              data: {
                ...rest,
                cart: {
                  connect: { CartID: cart.CartID },
                },
                product: {
                  connect: { id: ProductID },
                },
                ...(variant_id && {
                  product_variant: {
                    connect: { id: variant_id },
                  },
                }),
              },
            });
          }
        }

        for (const item of cartItemData) {
          const existingItem = userCart.cart_item.find((c) =>
            item.isVariant
              ? c.ProductID === item.ProductID
              : c.variant_id === item.variant_id,
          );
          if (existingItem) {
            const sum = existingItem.Quantity + item.Quantity;
            const isGreater = sum > existingItem.stockQuantity;
            await tx.cart_item.update({
              where: { CartItemID: existingItem.CartItemID },
              data: {
                Quantity: isGreater ? existingItem.stockQuantity : sum,
                TotalPrice: !isGreater
                  ? existingItem.TotalPrice + item.TotalPrice
                  : existingItem.stockQuantity * existingItem.Price,
              },
            });
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { variant_id, ProductID, CartID, ...rest } = item;
            await tx.cart_item.create({
              data: {
                ...rest,
                cart: {
                  connect: { CartID: userCart.userID },
                },
                product: {
                  connect: { id: ProductID },
                },
                ...(variant_id && {
                  product_variant: {
                    connect: { id: variant_id },
                  },
                }),
              },
            });
          }
        }
        return this.getCart({ userID: cartId });
      } catch (error) {
        console.log(error);
      }
    });
  }
}
