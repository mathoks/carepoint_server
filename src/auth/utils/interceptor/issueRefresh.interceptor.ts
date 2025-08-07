import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError, retry, catchError } from 'rxjs';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const maxRetries = 2;

    return next.handle().pipe(
      retry({
        count: maxRetries,
        delay: (error, retryCount) => {
          console.log(error);
          if (
            error.respones === 401 &&
            error.respones?.message === 'jwt expired'
          ) {
            request.res.redirect('api/v1/auth/refresh');
          }
          console.log(retryCount, error.message);
          return next.handle();
        },
      }),
      catchError((error) => {
        return throwError(() => error?.message);
      }),
    );
  }
}

// retry({}){
//   // delay: (error, count) => count * 1000,
//   attemps: maxRetries,
// // shouldRetry: (error)=> error.respons === 401 && error.respons?.message === 'token expired' });
// }));
