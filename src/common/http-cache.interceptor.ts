import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    const isGetCart = httpAdapter
      .getRequestUrl(request)
      .split('/')
      .includes('cart');
    const excludePaths = [
      // Routes to be excluded
    ];
    if (
      !isGetRequest ||
      isGetCart ||
      (isGetRequest &&
        excludePaths.includes(httpAdapter.getRequestUrl(request)))
    ) {
      return undefined;
    }
    // console.log('Tracking request:', {
    //   url: httpAdapter.getRequestUrl(request),
    //   method: httpAdapter.getRequestMethod(request),
    // });
    return httpAdapter.getRequestUrl(request);
  }
}
