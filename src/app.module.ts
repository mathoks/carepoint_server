import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

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
import { CacheService } from './cache/cache.service';
import { PgClientModule } from './pg-client/pg-client.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './common/http-cache.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CartController } from './cart/cart.controller';
import { isLoggedMiddleware } from './common/middleware/isLoggedMiddleware.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    CacheModule.register({
      ttl: 5000, // milliseconds
      max: 100, // maximum number of items in cache
      isGlobal: true, // makes the cache module available globally
    }),
    DevtoolsModule.register({ http: process.env.NODE_ENV !== 'production' }),
    UsersModule,
    ProductsModule,
    CartModule,
    PrismaModule,
    MailModule,
    PgClientModule.forRootAsync(),
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
    UsersService,
    CacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    // cookieExtractor,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isLoggedMiddleware)
      .exclude({
        path: 'cart/:id/getCart',
        method: RequestMethod.GET,
      })
      .forRoutes(CartController);
  }
}
