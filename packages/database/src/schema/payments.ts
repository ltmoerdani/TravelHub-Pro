import { pgTable, uuid, varchar, decimal, timestamp, jsonb, text } from 'drizzle-orm/pg-core';
import { bookings } from './bookings';

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  paymentNumber: varchar('payment_number', { length: 50 }).notNull().unique(),
  
  // Relationships
  bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
  
  // Payment details
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('IDR'),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, paid, failed, refunded, partial
  
  // Payment method and gateway
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(), // credit_card, bank_transfer, ewallet, cash
  paymentGateway: varchar('payment_gateway', { length: 50 }), // midtrans, xendit, manual
  gatewayTransactionId: varchar('gateway_transaction_id', { length: 255 }),
  
  // Islamic finance compliance
  isShariahCompliant: varchar('is_shariah_compliant', { length: 10 }).default('true'),
  mudharabahDetails: jsonb('mudharabah_details'), // Islamic finance contract details
  
  // Installment payments (for Umroh/Haji)
  installmentPlan: jsonb('installment_plan'),
  installmentNumber: varchar('installment_number', { length: 10 }),
  totalInstallments: varchar('total_installments', { length: 10 }),
  
  // Payment dates
  paymentDate: timestamp('payment_date'),
  dueDate: timestamp('due_date'),
  
  // Gateway response
  gatewayResponse: jsonb('gateway_response'),
  
  // Reconciliation
  isReconciled: varchar('is_reconciled', { length: 10 }).default('false'),
  reconciledAt: timestamp('reconciled_at'),
  reconciledBy: uuid('reconciled_by'),
  
  // Refund information
  refundReason: text('refund_reason'),
  refundDate: timestamp('refund_date'),
  refundAmount: decimal('refund_amount', { precision: 15, scale: 2 }),
  
  // Fees and charges
  processingFee: decimal('processing_fee', { precision: 15, scale: 2 }).default('0'),
  gatewayFee: decimal('gateway_fee', { precision: 15, scale: 2 }).default('0'),
  
  // Notes
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;