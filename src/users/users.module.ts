import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { ValidateToken } from 'src/auth/utils/helpers/validateAccessToken';

@Module({
  providers: [
    JwtService,
    AuthService,
    UsersService,
    PrismaService,
    ValidateToken,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
