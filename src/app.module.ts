import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { ProductsService } from './products/products.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
// import { cookieExtractor } from './auth/utils/helpers/cookiesExtractor';
import { MailModule } from './mail/mail.module';
import { ValidateToken } from './auth/utils/helpers/validateAccessToken';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    AuthModule,
    DevtoolsModule.register({ http: process.env.NODE_ENV !== 'production' }),
    UsersModule,
    ProductsModule,
    CartModule,
    PrismaModule,
    MailModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    AuthController,
    UsersController,
  ],
  providers: [
    AppService,
    PrismaService,
    ProductsService,
    JwtService,
    ValidateToken,
    UsersService
    // cookieExtractor,
  ],
})
export class AppModule {}
