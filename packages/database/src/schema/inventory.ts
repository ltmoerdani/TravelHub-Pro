import { pgTable, uuid, varchar, decimal, timestamp, jsonb, integer, text, date } from 'drizzle-orm/pg-core';
import { products } from './products';

export const inventory = pgTable('inventory', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  productId: uuid('product_id').references(() => products.id).notNull(),
  
  // Inventory details
  inventoryType: varchar('inventory_type', { length: 50 }).notNull(), // hotel_room, flight_seat, tour_slot
  totalCapacity: integer('total_capacity').notNull(),
  availableCapacity: integer('available_capacity').notNull(),
  reservedCapacity: integer('reserved_capacity').default(0),
  
  // Date-based availability
  availableFrom: date('available_from').notNull(),
  availableTo: date('available_to').notNull(),
  
  // Pricing
  basePrice: decimal('base_price', { precision: 15, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('IDR'),
  
  // Dynamic pricing factors
  seasonalMultiplier: decimal('seasonal_multiplier', { precision: 5, scale: 2 }).default('1.00'),
  demandMultiplier: decimal('demand_multiplier', { precision: 5, scale: 2 }).default('1.00'),
  groupDiscountThreshold: integer('group_discount_threshold').default(10),
  groupDiscountPercent: decimal('group_discount_percent', { precision: 5, scale: 2 }).default('0.00'),
  
  // Hotel-specific fields
  roomType: varchar('room_type', { length: 100 }),
  roomAmenities: jsonb('room_amenities'),
  maxOccupancy: integer('max_occupancy'),
  
  // Flight-specific fields
  flightNumber: varchar('flight_number', { length: 20 }),
  departureTime: timestamp('departure_time'),
  arrivalTime: timestamp('arrival_time'),
  aircraft: varchar('aircraft', { length: 100 }),
  seatClass: varchar('seat_class', { length: 50 }),
  
  // Tour-specific fields
  tourGuide: varchar('tour_guide', { length: 255 }),
  meetingPoint: text('meeting_point'),
  duration: varchar('duration', { length: 50 }),
  
  // Allotment management
  allotmentDetails: jsonb('allotment_details'),
  contractTerms: jsonb('contract_terms'),
  
  // Status and metadata
  status: varchar('status', { length: 20 }).notNull().default('active'), // active, inactive, sold_out, blocked
  lastUpdated: timestamp('last_updated').defaultNow(),
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const priceRules = pgTable('price_rules', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  productId: uuid('product_id').references(() => products.id),
  inventoryId: uuid('inventory_id').references(() => inventory.id),
  
  // Rule details
  ruleName: varchar('rule_name', { length: 255 }).notNull(),
  ruleType: varchar('rule_type', { length: 50 }).notNull(), // seasonal, demand, group, early_bird, last_minute
  
  // Conditions
  conditions: jsonb('conditions').notNull(), // date ranges, booking counts, etc.
  
  // Pricing adjustments
  adjustmentType: varchar('adjustment_type', { length: 20 }).notNull(), // percentage, fixed_amount
  adjustmentValue: decimal('adjustment_value', { precision: 10, scale: 2 }).notNull(),
  
  // Validity
  validFrom: timestamp('valid_from').notNull(),
  validTo: timestamp('valid_to').notNull(),
  
  // Priority and status
  priority: integer('priority').default(0), // higher number = higher priority
  isActive: varchar('is_active', { length: 10 }).default('true'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookingInventory = pgTable('booking_inventory', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  bookingId: uuid('booking_id').notNull(), // references bookings.id
  inventoryId: uuid('inventory_id').references(() => inventory.id).notNull(),
  
  // Allocation details
  quantityAllocated: integer('quantity_allocated').notNull(),
  allocationDate: timestamp('allocation_date').defaultNow().notNull(),
  
  // Pricing at time of booking
  unitPrice: decimal('unit_price', { precision: 15, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 15, scale: 2 }).notNull(),
  appliedRules: jsonb('applied_rules'), // which price rules were applied
  
  // Status
  status: varchar('status', { length: 20 }).notNull().default('allocated'), // allocated, confirmed, cancelled, released
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
export type PriceRule = typeof priceRules.$inferSelect;
export type NewPriceRule = typeof priceRules.$inferInsert;
export type BookingInventory = typeof bookingInventory.$inferSelect;
export type NewBookingInventory = typeof bookingInventory.$inferInsert;