import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@travel-agency/database';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BookingsModule } from './bookings/bookings.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UmrohModule } from './umroh/umroh.module';
import { InventoryModule } from './inventory/inventory.module';
import { AgentsModule } from './agents/agents.module';
import { DocumentsModule } from './documents/documents.module';
import { MarketingModule } from './marketing/marketing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    BookingsModule,
    CustomersModule,
    PaymentsModule,
    AnalyticsModule,
    UmrohModule,
    InventoryModule,
    AgentsModule,
    DocumentsModule,
    MarketingModule,
    NotificationsModule,
    SearchModule,
  ],
})
export class AppModule {}