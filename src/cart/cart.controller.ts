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

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('/:id/getCart')
  async getUserCart(@Param('id') userID: string): Promise<cart | object> {
    const data = await this.cartService.getCart({
      userID,
    });
    return data ?? {};
  }

  @Post('/:id/add-cartItem')
  async addCartItems(@Body() body, @Req() req): Promise<cart_item> {
    console.log({ ...body });
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
  ): Promise<cart_item> {
    const userId = req?.headers?.user ?? undefined;
    const { variant_id, CartID, ProductID, ...CartItemData } = body;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    console.log(CartItemData, CartID);
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
  async deleteCartItem(@Param('id') id: string, @Req() req): Promise<boolean> {
    const userId = req?.headers?.user ?? undefined;
    return this.cartService.deleteCartItem(id, userId);
  }
}
