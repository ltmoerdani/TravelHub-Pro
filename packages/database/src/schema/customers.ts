import { pgTable, uuid, varchar, text, timestamp, jsonb, date } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }).default('Indonesia'),
  
  // Identity documents
  idNumber: varchar('id_number', { length: 50 }),
  passportNumber: varchar('passport_number', { length: 50 }),
  passportExpiry: date('passport_expiry'),
  
  // Demographics
  dateOfBirth: date('date_of_birth'),
  gender: varchar('gender', { length: 10 }),
  nationality: varchar('nationality', { length: 100 }),
  
  // Customer relationship
  customerType: varchar('customer_type', { length: 20 }).notNull().default('regular'), // regular, vip, new
  loyaltyPoints: varchar('loyalty_points', { length: 10 }).default('0'),
  preferredContactMethod: varchar('preferred_contact_method', { length: 20 }).default('email'),
  
  // Islamic tourism specific
  islamicProfile: jsonb('islamic_profile'), // mahram info, dietary restrictions, etc.
  
  // Medical and special requirements
  medicalInfo: jsonb('medical_info'),
  specialRequirements: text('special_requirements'),
  emergencyContact: jsonb('emergency_contact'),
  
  // Marketing and preferences
  marketingConsent: varchar('marketing_consent', { length: 10 }).default('false'),
  preferences: jsonb('preferences'),
  
  // Metadata
  source: varchar('source', { length: 100 }), // how they found us
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;