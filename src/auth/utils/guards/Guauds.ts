import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Payload } from 'src/types';
import { UnauthorizedAcessException } from 'src/error/error.classes';
import { AuthService } from 'src/auth/auth.service';
import { ValidateToken } from '../helpers/validateAccessToken';

@Injectable()
export class EmailGuard extends AuthGuard('magiclink') {
  constructor() {
    super({
      action: 'requestToken',
      failureRedirect: 'auth/login',
      session: false,
    });
  }
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = super.getRequest(context) as any;
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class VerifyEmailGuard extends AuthGuard('magiclink') {
  constructor() {
    super({
      successReturnToOrRedirect: 'http://localhost:3001/home',
      failureRedirect: 'http://localhost:3001/login',
      session: false,
    });
  }
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = super.getRequest(context) as any;
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super({ session: false });
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info) {
    console.log(info);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(
    private JwtService: JwtService,
    private authservice: AuthService,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const Req = context.switchToHttp().getRequest();
      const Res = context.switchToHttp().getResponse();
      const res: any = await this.handleRequest(Req);
      Req.user = res;
      if (res.hasOwnProperty('new_access_token')) {
        Res.cookie('access_token', `Bearer ${res.new_access_token}`, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          domain: 'localhost',
          expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        });
      }
      return true;
    } catch (e) {
      throw new UnauthorizedAcessException(e.message);
    }
  }

  async handleRequest(Req: Request | any): Promise<object> {
    let user = null;
    console.log(Req);
    if (Req && Req.headers['authorization']) {
      const Token = Req?.headers['authorization'];
      const token_ =
        Token && Token.includes('Bearer')
          ? Token.replace('Bearer', '').trim()
          : Token;
      try {
        const jwt_payload: Payload = await this.JwtService.verify(token_, {
          secret: process.env.ACCESS_TOKEN,
        });
        user = {
          userId: jwt_payload.sub,
          email: jwt_payload.email,
          image: jwt_payload.image,
        };
      } catch (e) {
        if (e instanceof JsonWebTokenError && e.message === 'jwt expired') {
          const { sub, email, image } = await this.JwtService.decode(token_);
          const refresh_token = Req?.cookies['refresh_token']
            ?.replace('Bearer', '')
            .trim();
          if (sub && refresh_token) {
            const new_access_token = await this.authservice.refreshToken(
              sub,
              refresh_token,
            );
            user = new_access_token
              ? {
                  userId: sub,
                  email: email,
                  image: image,
                  new_access_token,
                }
              : null;
          } else {
            throw new UnauthorizedAcessException(e.message);
          }
        } else {
          throw new UnauthorizedAcessException(e.message);
        }
      }
      // You can throw an exception based on either "info" or "err" arguments
    } else throw new UnauthorizedException();
    return user;
  }
}

@Injectable()
export class MyAuthGuard2 implements CanActivate {
  constructor(private readonly verifyService: ValidateToken) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request);
    try {
      const authorizationHeader = request.headers['authorization'];
      if (!authorizationHeader) {
        throw new UnauthorizedException('No Authorization header found');
      }

      const [_, tokenType, token] = authorizationHeader.split(' ');
      // const oauth2Client = new OAuth2Client();
      try {
        const shouldAllow = await this.verifyService.validateAccessToken(
          token,
          tokenType,
        );
        return shouldAllow;
        // You can attach user information to the request object here
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.error('Error during Google ID Token verification:', error);
      throw new UnauthorizedException(
        'Invalid token or authentication failed.',
      );
    }
  }
}
