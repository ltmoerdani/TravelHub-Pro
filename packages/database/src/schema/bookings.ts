import { pgTable, uuid, varchar, decimal, timestamp, jsonb, integer, text } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { products } from './products';
import { users } from './users';

export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  bookingNumber: varchar('booking_number', { length: 50 }).notNull().unique(),
  
  // Relationships
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  agentId: uuid('agent_id').references(() => users.id),
  
  // Booking details
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, confirmed, cancelled, completed
  bookingDate: timestamp('booking_date').defaultNow().notNull(),
  travelDate: timestamp('travel_date').notNull(),
  returnDate: timestamp('return_date'),
  
  // Pricing
  basePrice: decimal('base_price', { precision: 15, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 15, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('IDR'),
  discountAmount: decimal('discount_amount', { precision: 15, scale: 2 }).default('0'),
  taxAmount: decimal('tax_amount', { precision: 15, scale: 2 }).default('0'),
  
  // Participants
  paxCount: integer('pax_count').notNull().default(1),
  participants: jsonb('participants'), // array of participant details
  
  // Special requirements
  specialRequests: text('special_requests'),
  dietaryRequirements: jsonb('dietary_requirements'),
  accessibilityNeeds: text('accessibility_needs'),
  
  // Islamic tourism specific
  islamicRequirements: jsonb('islamic_requirements'),
  mahramInfo: jsonb('mahram_info'),
  
  // Booking source and channel
  bookingChannel: varchar('booking_channel', { length: 50 }).default('online'), // online, offline, mobile, phone
  source: varchar('source', { length: 100 }),
  
  // Additional services
  addOns: jsonb('add_ons'), // additional services booked
  insurance: jsonb('insurance'),
  
  // Internal notes
  agentNotes: text('agent_notes'),
  internalNotes: text('internal_notes'),
  
  // Cancellation
  cancellationReason: text('cancellation_reason'),
  cancellationDate: timestamp('cancellation_date'),
  refundAmount: decimal('refund_amount', { precision: 15, scale: 2 }),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;