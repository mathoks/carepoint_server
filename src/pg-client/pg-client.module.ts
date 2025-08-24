import { Module, Global, DynamicModule } from '@nestjs/common';
import { PgClientService } from './pg-client.service';
import { PG_CLIENT_OPTIONS } from 'src/types/constants.dto';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

export interface PgClientModuleOptions {
  connectionString: string;
}
@Global()
@Module({
  providers: [PgClientService],
})
export class PgClientModule {
  static forRootAsync(): DynamicModule {
    return {
      module: PgClientModule,
      imports: [ConfigModule], // Import ConfigModule
      providers: [
        {
          provide: PG_CLIENT_OPTIONS,
          // Use useFactory to get the connection string from the ConfigService
          useFactory: (configService: ConfigService) => ({
            connectionString: configService.get<string>('DATABASE_URL'), // Get the env variable
          }),
          inject: [ConfigService],
        },
        PgClientService,
      ],
      exports: [PgClientService],
    };
  }
}
