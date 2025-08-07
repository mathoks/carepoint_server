import { ForbiddenException } from '@nestjs/common';
export class UnauthorizedAcessException extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
