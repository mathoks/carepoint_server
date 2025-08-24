// src/common/interceptors/bigint.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => this.convertBigIntsToStrings(data)));
  }

  private convertBigIntsToStrings(data: any): any {
    if (typeof data === 'bigint') {
      return data.toString();
    }
    if (Array.isArray(data)) {
      return data.map((item) => this.convertBigIntsToStrings(item));
    }
    if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = this.convertBigIntsToStrings(data[key]);
        }
      }
    }
    return data;
  }
}
