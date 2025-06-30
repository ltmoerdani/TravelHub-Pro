import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export * from './schema';

export class DatabaseService {
  constructor(private db: any) {}

  get database() {
    return this.db;
  }
}

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL') || 
          'postgresql://postgres:password@localhost:5432/travel_agency';
        
        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
    },
    DatabaseService,
  ],
  exports: ['DATABASE_CONNECTION', DatabaseService],
})
export class DatabaseModule {}