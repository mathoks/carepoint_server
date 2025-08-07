import { Strategy } from 'passport-magic-link';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { Prisma, user as UserModel } from '@prisma/client';
import { sendVerificationRequest } from '../mail/sendMail';

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        secret: '444tffffyyjkhigfddtfyf',
        userFields: ['email'],
        tokenField: 'token',
        verifyUserAfterToken: true,
      },
      async (user: Prisma.userWhereUniqueInput, token: string) => {
        await this.authService.validateUser(user);
        return sendVerificationRequest({
          identifier: user.email,
          url: `http://localhost:3000/api/v1/auth/login/email/verify?token=${token}`,
          provider: {
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
          },
          theme: 'default',
        });
      },
      async (user: Prisma.userWhereUniqueInput): Promise<UserModel> => {
        const user_exist = await this.authService.validateUser(user);
        if (!user_exist) {
          throw new UnauthorizedException();
        }
        return user_exist;
      },
    );
  }
}
