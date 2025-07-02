import { pgTable, uuid, varchar, decimal, timestamp, jsonb, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const agents = pgTable('agents', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  userId: uuid('user_id').references(() => users.id).notNull(),
  
  // Agent details
  agentCode: varchar('agent_code', { length: 20 }).notNull().unique(),
  agentLevel: varchar('agent_level', { length: 20 }).notNull().default('junior'), // junior, senior, supervisor, manager
  territory: varchar('territory', { length: 100 }),
  
  // Commission structure
  baseCommissionRate: decimal('base_commission_rate', { precision: 5, scale: 2 }).default('5.00'), // percentage
  bonusCommissionRate: decimal('bonus_commission_rate', { precision: 5, scale: 2 }).default('0.00'),
  commissionTier: varchar('commission_tier', { length: 20 }).default('standard'),
  
  // Performance metrics
  totalSales: decimal('total_sales', { precision: 15, scale: 2 }).default('0'),
  totalCommission: decimal('total_commission', { precision: 15, scale: 2 }).default('0'),
  monthlyTarget: decimal('monthly_target', { precision: 15, scale: 2 }).default('0'),
  
  // Contact and profile
  specializations: jsonb('specializations'), // umroh, travel, hotel, etc.
  languages: jsonb('languages'),
  certifications: jsonb('certifications'),
  
  // Status and settings
  isActive: varchar('is_active', { length: 10 }).default('true'),
  joinDate: timestamp('join_date').defaultNow().notNull(),
  lastActiveAt: timestamp('last_active_at'),
  
  // Notes and metadata
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const agentCommissions = pgTable('agent_commissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  agentId: uuid('agent_id').references(() => agents.id).notNull(),
  bookingId: uuid('booking_id').notNull(), // references bookings.id
  
  // Commission details
  commissionType: varchar('commission_type', { length: 50 }).notNull(), // base, bonus, override, special
  salesAmount: decimal('sales_amount', { precision: 15, scale: 2 }).notNull(),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).notNull(),
  commissionAmount: decimal('commission_amount', { precision: 15, scale: 2 }).notNull(),
  
  // Payment details
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending'), // pending, paid, cancelled
  paymentDate: timestamp('payment_date'),
  paymentReference: varchar('payment_reference', { length: 100 }),
  
  // Period
  commissionPeriod: varchar('commission_period', { length: 20 }).notNull(), // monthly, quarterly, annual
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const agentTasks = pgTable('agent_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  agentId: uuid('agent_id').references(() => agents.id).notNull(),
  assignedBy: uuid('assigned_by').references(() => users.id),
  customerId: uuid('customer_id'), // references customers.id
  bookingId: uuid('booking_id'), // references bookings.id
  
  // Task details
  taskType: varchar('task_type', { length: 50 }).notNull(), // follow_up, document_collection, payment_reminder, etc.
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  priority: varchar('priority', { length: 20 }).default('medium'), // low, medium, high, urgent
  
  // Scheduling
  dueDate: timestamp('due_date'),
  reminderDate: timestamp('reminder_date'),
  
  // Status and completion
  status: varchar('status', { length: 20 }).default('pending'), // pending, in_progress, completed, cancelled
  completedAt: timestamp('completed_at'),
  completionNotes: text('completion_notes'),
  
  // Metadata
  tags: jsonb('tags'),
  attachments: jsonb('attachments'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
export type AgentCommission = typeof agentCommissions.$inferSelect;
export type NewAgentCommission = typeof agentCommissions.$inferInsert;
export type AgentTask = typeof agentTasks.$inferSelect;
export type NewAgentTask = typeof agentTasks.$inferInsert;