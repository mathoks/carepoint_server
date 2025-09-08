import { Injectable } from '@nestjs/common';
import {
  Prisma,
  user as UserModel,
  account as AccountModel,
  shipping_address,
  user_preferences,
} from '@prisma/client';
import { Tokens } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<UserModel> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findOneAccount(
    userWhereUniqueInput: Prisma.accountProvider_providerAccountIdCompoundUniqueInput,
  ): Promise<AccountModel> {
    return this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: userWhereUniqueInput,
      },
    });
  }

  async getRefreshTokenFromDb(
    accountWhereUniqueInput: Prisma.accountProvider_providerAccountIdCompoundUniqueInput,
  ): Promise<AccountModel> {
    return this.prisma.account.findUnique({
      where: { provider_providerAccountId: accountWhereUniqueInput },
      include: {
        user: {
          select: {
            email: true,
            id: true,
            image: true,
          },
        },
      },
    });
  }
  async updateUserLogin(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<UserModel> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        IsEmailVerified: true,
        emailVerified: new Date(),
      },
    });
  }

  async updateHashRefreshToken(
    accountWhereUniqueInput: Prisma.accountWhereUniqueInput,
    token: Tokens,
  ): Promise<AccountModel> {
    return this.prisma.account.update({
      where: { id: accountWhereUniqueInput.id },
      data: {
        id: accountWhereUniqueInput.id,
        refresh_token: token.refresh_token,
        type: 'email',
        provider: 'email',
        providerAccountId: accountWhereUniqueInput.id,
      },
    });
  }

  async AddAddress(
    shippingAddressData: Prisma.shipping_addressCreateInput,
    user_id: string,
  ): Promise<shipping_address> {
    return this.prisma.shipping_address.create({
      data: {
        ...shippingAddressData,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  async AddPayMethod(
    userprefData: Prisma.user_preferencesCreateInput,
    userId: user_preferences['id'],
  ): Promise<user_preferences> {
    return this.prisma.user_preferences.upsert({
      where: { id: userId },
      update: {
        ...userprefData,
      },
      create: {
        ...userprefData,
        user_pref: { connect: { id: userId } },
      },
    });
  }
  async GetAddress(user_id: string): Promise<shipping_address[]> {
    const data = await this.prisma.shipping_address.findMany({
      where: {
        id: user_id,
      },
    });
    return data;
  }

  async GetPref(user_id: string): Promise<user_preferences> {
    const data = await this.prisma.user_preferences.findUnique({
      where: {
        id: user_id,
      },
    });
    return data;
  }
}
