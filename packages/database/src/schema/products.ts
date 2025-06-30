import { pgTable, uuid, varchar, text, integer, decimal, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // travel, hotel, umroh, haji
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 15, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('IDR'),
  duration: varchar('duration', { length: 100 }),
  capacity: integer('capacity').notNull().default(0),
  location: varchar('location', { length: 255 }),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  
  // JSON fields for flexible data
  inclusions: jsonb('inclusions'), // array of included items
  exclusions: jsonb('exclusions'), // array of excluded items
  itinerary: jsonb('itinerary'), // detailed day-by-day itinerary
  images: jsonb('images'), // array of image URLs
  features: jsonb('features'), // special features
  
  // Islamic tourism specific
  islamicFeatures: jsonb('islamic_features'), // umroh/haji specific data
  
  // Pricing and availability
  seasonalPricing: jsonb('seasonal_pricing'),
  groupPricing: jsonb('group_pricing'),
  
  // SEO and marketing
  slug: varchar('slug', { length: 255 }).unique(),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  tags: jsonb('tags'), // array of tags
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;