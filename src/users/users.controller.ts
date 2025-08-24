import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { shipping_address, user_preferences } from '@prisma/client';
import { UsersService } from './users.service';
import { createAddressDto } from 'src/types/custom.dto';
import { MyAuthGuard2 } from '../auth/utils/guards/Guauds';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('profile')
  // @UseGuards(MyAuthGuard)
  // @UseInterceptors(RefreshTokenInterceptor)
  async LoginUser(
    @Req() req: Request | any,
    @Res() res: Response | any,
  ): Promise<void> {
    res.send('jjj');
  }

  @Get('profile/:id/address')
  async GetAddress(@Param('id') id: string): Promise<shipping_address[]> {
    const data = await this.userService.GetAddress(id);
    return data;
  }

  @Get('profile/:id/preference')
  async GetUserPref(
    @Param('id') id: string,
  ): Promise<user_preferences | string> {
    const data = await this.userService.GetPref(id);
    return data ?? 'null';
  }

  @Post('/Add-Address/:id')
  @UseGuards(MyAuthGuard2)
  async AddAddress(
    @Req() req: Request | any,
    @Res() res: Response | any,
    @Param('id') id: string,
    @Body('body') body: createAddressDto,
  ): Promise<shipping_address> {
    return this.userService.AddAddress(body, id);
  }
}
