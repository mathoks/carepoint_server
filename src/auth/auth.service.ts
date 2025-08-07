import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  Prisma,
  user as UserModel,
  account as AccountModel,
} from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { hashTokens } from './utils/helpers';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: Prisma.userWhereUniqueInput,
  ): Promise<UserModel | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.usersService.updateUserLogin(email);
    return user;
  }

  async validateUserAccount(
    coumpoundId: Prisma.accountProvider_providerAccountIdCompoundUniqueInput,
  ): Promise<boolean> {
    const account = await this.usersService.findOneAccount(coumpoundId);
    if (!account) {
      return false;
    }
    return true;
  }

  async updateHash(
    email: Prisma.userWhereUniqueInput,
    token: Tokens,
  ): Promise<UserModel | null> {
    const user = await this.usersService.findOne({ email: email.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.usersService.updateHashRefreshToken(user, token);
    return user;
  }

  async login(user: any | UserModel) {
    try {
      const tokens = await this.getTokens(user);
      const hash_tokens = await hashTokens(tokens);
      await this.updateHash(user, hash_tokens);
      return tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error('something went wrong');
    }
  }

  async refreshToken(userId: string, refresh_token?: string): Promise<string> {
    try {
      const account_info: AccountModel | any =
        await this.usersService.getRefreshTokenFromDb({
          provider: 'email',
          providerAccountId: userId,
        });

      if (!account_info.refresh_token) {
        throw new Error(`please sign in ${userId}`);
      }

      const compare = await bcrypt.compare(
        refresh_token,
        account_info.refresh_token,
      );

      if (!compare) {
        throw new UnauthorizedException(`refresh token is not valid`);
      }
      await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN,
      });
      const payload: Payload = {
        email: account_info.email,
        sub: account_info.user.id,
        image: account_info.user?.image,
      };
      const new_access_token = await this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: 60 * 15,
      });
      return new_access_token;
    } catch (error) {
      throw new Error('please signIn ' + '' + error);
    }
  }

  async getTokens(user: UserModel): Promise<Tokens> {
    const payload: Payload = {
      email: user.email,
      sub: user.id,
      image: user.image,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN,
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
