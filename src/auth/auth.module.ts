import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { EmailStrategy } from './utils/strategies/emailStrategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/strategies/jwtStrategy';
import { RefreshStrategy } from './utils/strategies';
import { ValidateToken } from './utils/helpers/validateAccessToken';
// import { cookieExtractor } from './utils/helpers/cookiesExtractor';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule,
    // JwtModule.register({
    //   secret: process.env.AUTH_SECRET,
    //   signOptions: { expiresIn: 60 * 5 },
    // }),
  ],
  providers: [
    PrismaService,
    AuthService,
    EmailStrategy,
    UsersService,
    JwtStrategy,
    RefreshStrategy,
    ValidateToken
    // cookieExtractor,
  ],
  exports: [AuthService],
})
export class AuthModule {}
