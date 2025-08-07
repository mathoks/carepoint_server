import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ValidateToken {
  constructor(
    private JwtService: JwtService,
    private userservice: UsersService,
  ) {}
  audience: string = `${process.env.AUTH_GOOGLE_ID}`;
  public async validateAccessToken(
    token: string,
    tokenType: string,
  ): Promise<boolean> {
    try {
      if (tokenType === 'google') {
        const TokenOrError = await fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, {
            method: 'GET',
          }
        );
        console.log(TokenOrError.statusText);
        if (TokenOrError.statusText === 'OK') {
          const data = await TokenOrError.json();
          console.log(data);
          if (data.audience !== this.audience)
            throw new UnauthorizedException();
          const isUser = this.userservice.findOneAccount({
            provider: 'google',
            providerAccountId: data.user_id,
          });
          if (!isUser) {
            throw new UnauthorizedException();
          }
          if (Date.now() > data.expires_at * 1000) {
            throw new UnauthorizedException();
          }
          return true;
        } else throw new UnauthorizedException();
      } else if (tokenType === 'nodemailer') {
        const decoded = this.JwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN,
        });
        if (decoded.audience !== this.audience)
          throw new UnauthorizedException();
        const isUser = this.userservice.findOneAccount({
          provider: 'google',
          providerAccountId: decoded.user_id,
        });
        if (!isUser) {
          throw new UnauthorizedException();
        }
        if (Date.now() > decoded.expires_at * 1000) {
          throw new UnauthorizedException();
        }
        return true;
      } else throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }
}
