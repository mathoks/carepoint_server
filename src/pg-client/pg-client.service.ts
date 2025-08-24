import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import * as pgp from 'pg-promise';
import { PgClientModuleOptions } from './pg-client.module';
import { PG_CLIENT_OPTIONS } from 'src/types/constants.dto';

@Injectable()
export class PgClientService implements OnModuleInit, OnModuleDestroy {
  public db: pgp.IDatabase<object>;
  constructor(
    @Inject(PG_CLIENT_OPTIONS) private readonly options: PgClientModuleOptions,
  ) {}

  async onModuleInit() {
    try {
      const pgpInstance = pgp();
      this.db = pgpInstance(this.options.connectionString);
      console.log('Successfully created pg-promise database instance.');
    } catch (error) {
      console.error('Failed to create pg-promise instance:', error);
      // It's not necessary to throw here since pg-promise handles connection internally.
      // The first query will fail if the connection is invalid.
    }
  }

  async onModuleDestroy() {
    if (this.db) {
      await this.db.$pool.end();
      console.log('pg-promise connection pool has been closed.');
    }
  }

  async query<T>(text: string, values?: any): Promise<T[]> {
    if (!this.db) {
      throw new Error('Database client is not initialized.');
    }
    return this.db.any<T>(text, values);
  }
}
