import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN,
      passReqToCallback: true,
    });
  }

  async validate(@Request() req: any, payload: any) {
    const refreshToken = req.get('authorization').replace('bearer', '').trim();
    const info = { userId: payload.sub, email: payload.email };
    return {
      ...info,
      refreshToken,
    };
  }
}
