// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class cookieExtractor {
//   constructor(private req: Request | any) {}

//   token = null;
//   extractJwt(): Promise<string> {
//     if (this.req && this.req.cookies) {
//       this.token = this.req.cookies['access_token'];
//     }
//     return this.token;
//   }
// }

export const cookieExtractor = (req: Request | any) => {
  let jwt = null;
  console.log('kkkkk');
  if (!req && !req?.cookies) {
    jwt = req?.cookies['access_token'];
  }
  return jwt;
};
