import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // Extract the JWT token from the request headers and validate it.
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mathewcarepoint478',
      passReqToCallback: false,
    });
  }

  async validate(
    payload: any,
    done: (err: any, user: any, info?: any) => void,
  ) {
    const { exp } = payload;
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (Date.now() > exp) {
      done('Unauthorized', false);
    }

    return done(null, { userId: payload.sub, email: payload.email });
  }
}
