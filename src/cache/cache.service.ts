import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import * as pg from 'pg';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private listenerClient: pg.Client;

  // A simple in-memory cache for demonstration purposes
  //   private cache = new Map<string, any>();

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    // You can inject PgClientService if you need to perform database operations
    // this.pgClientService = pgClientService;
  }

  async onModuleInit() {
    try {
      // Create a dedicated pg.Client for listening to notifications
      const pgConfig = {
        connectionString: this.configService.get<string>('DATABASE_URL'),
      };
      this.listenerClient = new pg.Client(pgConfig);
      await this.listenerClient.connect();

      // Listen for a specific channel (e.g., 'user_updates')
      await this.listenerClient.query('LISTEN product_updates');
      console.log(
        'Listening for database notifications on "products" channel.',
      );

      // Set up the event listener for notifications
      this.listenerClient.on('notification', (msg) => {
        console.log('Database notification received:', msg);
        // The payload is typically a JSON string, so we need to parse it
        try {
          const payload = JSON.parse(msg.payload);
          this.handleNotification(msg.channel, payload);
        } catch (error) {
          console.error(
            'Failed to parse notification payload:',
            msg.payload,
            error,
          );
        }
      });
    } catch (error) {
      console.error('Failed to start cache invalidation listener:', error);
    }
  }

  async onModuleDestroy() {
    if (this.listenerClient) {
      // End the dedicated connection when the module is destroyed
      await this.listenerClient.end();
      console.log('Database listener client disconnected.');
    }
  }

  private async handleNotification(channel: string, payload: any) {
    console.log(
      this.cacheManager.stores.forEach((v) => console.log(v)),
      'key',
    );
    if (channel === 'product_updates') {
      // Logic to invalidate the cache based on the received data
      console.log(`Invalidating cache for product ID: ${payload.id}`);
      await this.cacheManager.del('products');

      //   this.cache.delete(`user_${payload.id}`);
      // In a real application, you would also clear a real cache like Redis or Memcached
    }
  }

  /**
   * Example method to get data from the cache.
   * This would typically be part of your data-fetching service.
   * @param key The cache key to retrieve.
   * @returns The cached data if it exists.
   */
  //   public getFromCache(key: string): any | undefined {
  //     return this.cache.get(key);
  //   }
}
