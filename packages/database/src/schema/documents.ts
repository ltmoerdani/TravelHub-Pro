import { pgTable, uuid, varchar, timestamp, jsonb, text, integer } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { bookings } from './bookings';

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  customerId: uuid('customer_id').references(() => customers.id),
  bookingId: uuid('booking_id').references(() => bookings.id),
  
  // Document details
  documentType: varchar('document_type', { length: 50 }).notNull(), // passport, visa, vaccination, medical, etc.
  documentNumber: varchar('document_number', { length: 100 }),
  documentName: varchar('document_name', { length: 255 }).notNull(),
  
  // File information
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileSize: integer('file_size'), // in bytes
  fileType: varchar('file_type', { length: 50 }), // pdf, jpg, png, etc.
  filePath: text('file_path').notNull(),
  fileHash: varchar('file_hash', { length: 64 }), // for integrity checking
  
  // Document validity
  issueDate: timestamp('issue_date'),
  expiryDate: timestamp('expiry_date'),
  issuingAuthority: varchar('issuing_authority', { length: 255 }),
  issuingCountry: varchar('issuing_country', { length: 100 }),
  
  // Verification status
  verificationStatus: varchar('verification_status', { length: 20 }).default('pending'), // pending, verified, rejected, expired
  verifiedBy: uuid('verified_by'), // references users.id
  verifiedAt: timestamp('verified_at'),
  verificationNotes: text('verification_notes'),
  
  // Notifications
  expiryNotificationSent: varchar('expiry_notification_sent', { length: 10 }).default('false'),
  lastNotificationDate: timestamp('last_notification_date'),
  
  // Metadata
  tags: jsonb('tags'),
  metadata: jsonb('metadata'), // additional document-specific data
  
  // Access control
  isPublic: varchar('is_public', { length: 10 }).default('false'),
  accessLevel: varchar('access_level', { length: 20 }).default('private'), // private, agent, public
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documentTemplates = pgTable('document_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Template details
  templateName: varchar('template_name', { length: 255 }).notNull(),
  templateType: varchar('template_type', { length: 50 }).notNull(), // invoice, voucher, contract, itinerary
  category: varchar('category', { length: 50 }), // umroh, travel, hotel
  
  // Template content
  templateContent: text('template_content').notNull(), // HTML template
  templateVariables: jsonb('template_variables'), // available variables
  
  // Styling
  styles: jsonb('styles'), // CSS styles
  layout: varchar('layout', { length: 50 }).default('standard'),
  
  // Settings
  isActive: varchar('is_active', { length: 10 }).default('true'),
  isDefault: varchar('is_default', { length: 10 }).default('false'),
  
  // Metadata
  description: text('description'),
  previewImage: text('preview_image'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const generatedDocuments = pgTable('generated_documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  templateId: uuid('template_id').references(() => documentTemplates.id).notNull(),
  bookingId: uuid('booking_id').references(() => bookings.id),
  customerId: uuid('customer_id').references(() => customers.id),
  
  // Document details
  documentNumber: varchar('document_number', { length: 100 }).notNull().unique(),
  documentType: varchar('document_type', { length: 50 }).notNull(),
  
  // Generated content
  generatedContent: text('generated_content').notNull(), // final HTML
  generatedData: jsonb('generated_data'), // data used for generation
  
  // File information
  pdfPath: text('pdf_path'), // path to generated PDF
  pdfSize: integer('pdf_size'),
  
  // Status
  status: varchar('status', { length: 20 }).default('draft'), // draft, final, sent, archived
  
  // Delivery
  sentTo: jsonb('sent_to'), // email addresses where sent
  sentAt: timestamp('sent_at'),
  deliveryStatus: varchar('delivery_status', { length: 20 }), // pending, delivered, failed
  
  // Metadata
  generatedBy: uuid('generated_by'), // references users.id
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type DocumentTemplate = typeof documentTemplates.$inferSelect;
export type NewDocumentTemplate = typeof documentTemplates.$inferInsert;
export type GeneratedDocument = typeof generatedDocuments.$inferSelect;
export type NewGeneratedDocument = typeof generatedDocuments.$inferInsert;