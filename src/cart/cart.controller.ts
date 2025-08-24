import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { cart, cart_item } from '@prisma/client';
import { CartService } from './cart.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('cart')
@CacheKey('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @CacheTTL(1)
  @Get('/:id/getCart')
  async getUserCart(@Param('id') userID: string): Promise<cart | object> {
    const data = await this.cartService.getCart({
      userID,
    });
    return data ?? { cart_item: [] };
  }

  @Patch('/merge-cartItem')
  async mergeCartItems(@Body() body, @Req() req): Promise<cart> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cart_items
    } = body;
    const userId = req.headers.user ?? undefined;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.cartService.mergeCart(cart_items, userId);
  }

  @Post('/:id/add-cartItem')
  async addCartItems(@Body() body, @Req() req): Promise<cart_item> {
    const userId = req.headers.user ?? undefined;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.cartService.addCartItem(body.cartItemData, userId);
  }

  @Patch('/:id/update-cartItem')
  async updateCartItem(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ): Promise<cart_item | cart_item['CartItemID']> {
    const userId = req?.headers?.user ?? undefined;
    const { variant_id, CartID, ProductID, operation, ...CartItemData } = body;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const data = await this.cartService.updateCartItem(
      CartItemData,
      { userID: userId },
      {
        userID: userId,
        CartID: userId,
      },
      {
        CartItemID: body?.CartItemID,
        variant_id,
        ProductID,
      },
    );
    return data;
  }

  @Delete('/:id/remove-cartItem')
  async deleteCartItem(
    @Param('id') id: string,
    @Req() req,
  ): Promise<cart_item['CartItemID'] | object> {
    console.log('Deleting cart item with ID:', id);
    const userId = req?.headers?.user ?? undefined;
    const data = await this.cartService.deleteCartItem(id, userId);
    return { cartItemID: data };
  }
}
