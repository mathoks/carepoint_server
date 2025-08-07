import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
  Render,
  Redirect,
} from '@nestjs/common';
import { EmailGuard, VerifyEmailGuard } from './utils/guards/Guauds';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login/email')
  @UseGuards(EmailGuard)
  async LoginUser(@Res() res: Response): Promise<void> {
    res.redirect('email/check');
  }

  @Get('login/email/check')
  @Render('confirm')
  confirm() {}

  @Get('login/email/verify')
  @UseGuards(VerifyEmailGuard)
  @Redirect('http://localhost:3001/home')
  async verifyEmail(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const token = await this.authService.login(req.user);
    res.cookie('access_token', `Bearer ${token.access_token}`, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      domain: 'localhost',
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });
    res.cookie('refresh_token', `Bearer ${token.refresh_token}`, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });
  }
}
