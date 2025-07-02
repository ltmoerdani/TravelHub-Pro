import { pgTable, uuid, varchar, timestamp, jsonb, text, decimal, integer } from 'drizzle-orm/pg-core';
import { customers } from './customers';

export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Campaign details
  campaignName: varchar('campaign_name', { length: 255 }).notNull(),
  campaignType: varchar('campaign_type', { length: 50 }).notNull(), // email, sms, whatsapp, popup, banner
  category: varchar('category', { length: 50 }), // promotional, informational, seasonal
  
  // Content
  subject: varchar('subject', { length: 255 }),
  content: text('content').notNull(),
  templateId: uuid('template_id'), // references email/sms templates
  
  // Targeting
  targetAudience: jsonb('target_audience'), // customer segments, filters
  customerIds: jsonb('customer_ids'), // specific customer IDs
  
  // Scheduling
  scheduledAt: timestamp('scheduled_at'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  
  // Status
  status: varchar('status', { length: 20 }).default('draft'), // draft, scheduled, running, completed, paused, cancelled
  
  // Performance tracking
  totalSent: integer('total_sent').default(0),
  totalDelivered: integer('total_delivered').default(0),
  totalOpened: integer('total_opened').default(0),
  totalClicked: integer('total_clicked').default(0),
  totalConverted: integer('total_converted').default(0),
  
  // Budget and costs
  budget: decimal('budget', { precision: 15, scale: 2 }),
  costPerSend: decimal('cost_per_send', { precision: 10, scale: 4 }),
  totalCost: decimal('total_cost', { precision: 15, scale: 2 }).default('0'),
  
  // Metadata
  tags: jsonb('tags'),
  notes: text('notes'),
  
  createdBy: uuid('created_by'), // references users.id
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const campaignDeliveries = pgTable('campaign_deliveries', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  campaignId: uuid('campaign_id').references(() => campaigns.id).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  
  // Delivery details
  deliveryChannel: varchar('delivery_channel', { length: 50 }).notNull(), // email, sms, whatsapp
  recipientAddress: varchar('recipient_address', { length: 255 }).notNull(), // email or phone
  
  // Status tracking
  status: varchar('status', { length: 20 }).default('pending'), // pending, sent, delivered, failed, bounced
  sentAt: timestamp('sent_at'),
  deliveredAt: timestamp('delivered_at'),
  openedAt: timestamp('opened_at'),
  clickedAt: timestamp('clicked_at'),
  
  // Engagement tracking
  openCount: integer('open_count').default(0),
  clickCount: integer('click_count').default(0),
  
  // Response tracking
  responseReceived: varchar('response_received', { length: 10 }).default('false'),
  responseContent: text('response_content'),
  responseAt: timestamp('response_at'),
  
  // Error handling
  errorCode: varchar('error_code', { length: 50 }),
  errorMessage: text('error_message'),
  retryCount: integer('retry_count').default(0),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const promotions = pgTable('promotions', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Promotion details
  promotionCode: varchar('promotion_code', { length: 50 }).notNull().unique(),
  promotionName: varchar('promotion_name', { length: 255 }).notNull(),
  promotionType: varchar('promotion_type', { length: 50 }).notNull(), // discount, cashback, upgrade, bundle
  
  // Discount configuration
  discountType: varchar('discount_type', { length: 20 }), // percentage, fixed_amount, buy_x_get_y
  discountValue: decimal('discount_value', { precision: 10, scale: 2 }),
  maxDiscountAmount: decimal('max_discount_amount', { precision: 15, scale: 2 }),
  minOrderAmount: decimal('min_order_amount', { precision: 15, scale: 2 }),
  
  // Applicability
  applicableProducts: jsonb('applicable_products'), // product IDs or categories
  applicableCustomers: jsonb('applicable_customers'), // customer segments
  
  // Usage limits
  maxUsageTotal: integer('max_usage_total'), // total usage limit
  maxUsagePerCustomer: integer('max_usage_per_customer').default(1),
  currentUsage: integer('current_usage').default(0),
  
  // Validity
  validFrom: timestamp('valid_from').notNull(),
  validTo: timestamp('valid_to').notNull(),
  
  // Status
  isActive: varchar('is_active', { length: 10 }).default('true'),
  isPublic: varchar('is_public', { length: 10 }).default('true'), // public or invitation-only
  
  // Metadata
  description: text('description'),
  terms: text('terms'),
  
  createdBy: uuid('created_by'), // references users.id
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const promotionUsage = pgTable('promotion_usage', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  promotionId: uuid('promotion_id').references(() => promotions.id).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  bookingId: uuid('booking_id'), // references bookings.id
  
  // Usage details
  usageDate: timestamp('usage_date').defaultNow().notNull(),
  originalAmount: decimal('original_amount', { precision: 15, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 15, scale: 2 }).notNull(),
  finalAmount: decimal('final_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Status
  status: varchar('status', { length: 20 }).default('applied'), // applied, cancelled, refunded
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
export type CampaignDelivery = typeof campaignDeliveries.$inferSelect;
export type NewCampaignDelivery = typeof campaignDeliveries.$inferInsert;
export type Promotion = typeof promotions.$inferSelect;
export type NewPromotion = typeof promotions.$inferInsert;
export type PromotionUsage = typeof promotionUsage.$inferSelect;
export type NewPromotionUsage = typeof promotionUsage.$inferInsert;