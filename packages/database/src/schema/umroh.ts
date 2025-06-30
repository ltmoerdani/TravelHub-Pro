import { pgTable, uuid, varchar, timestamp, jsonb, text, date } from 'drizzle-orm/pg-core';
import { bookings } from './bookings';

export const umrohPackages = pgTable('umroh_packages', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Relationships
  bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
  
  // Flight details
  departureAirport: varchar('departure_airport', { length: 10 }).notNull(),
  arrivalAirport: varchar('arrival_airport', { length: 10 }).notNull(),
  airline: varchar('airline', { length: 100 }),
  flightNumber: varchar('flight_number', { length: 20 }),
  departureDate: timestamp('departure_date').notNull(),
  returnDate: timestamp('return_date').notNull(),
  
  // Accommodation
  makkahHotel: varchar('makkah_hotel', { length: 255 }).notNull(),
  makkahHotelRating: varchar('makkah_hotel_rating', { length: 10 }),
  makkahCheckIn: date('makkah_check_in'),
  makkahCheckOut: date('makkah_check_out'),
  makkahRoomType: varchar('makkah_room_type', { length: 100 }),
  
  madinahHotel: varchar('madinah_hotel', { length: 255 }).notNull(),
  madinahHotelRating: varchar('madinah_hotel_rating', { length: 10 }),
  madinahCheckIn: date('madinah_check_in'),
  madinahCheckOut: date('madinah_check_out'),
  madinahRoomType: varchar('madinah_room_type', { length: 100 }),
  
  // Muthawif and guidance
  muthawifName: varchar('muthawif_name', { length: 255 }),
  muthawifLanguage: varchar('muthawif_language', { length: 50 }).default('Indonesian'),
  muthawifContact: varchar('muthawif_contact', { length: 50 }),
  
  // Group information
  groupLeader: varchar('group_leader', { length: 255 }),
  groupSize: varchar('group_size', { length: 10 }),
  groupCode: varchar('group_code', { length: 50 }),
  
  // Visa and documents
  visaType: varchar('visa_type', { length: 50 }).default('umroh'),
  visaStatus: varchar('visa_status', { length: 20 }).default('pending'),
  visaNumber: varchar('visa_number', { length: 100 }),
  visaIssueDate: date('visa_issue_date'),
  visaExpiryDate: date('visa_expiry_date'),
  
  // Health requirements
  vaccinationStatus: varchar('vaccination_status', { length: 20 }).default('pending'),
  vaccinationCertificate: text('vaccination_certificate'),
  healthCertificate: text('health_certificate'),
  
  // Islamic guidance and schedule
  islamicGuidance: jsonb('islamic_guidance'), // manasik, doa, guidance materials
  prayerSchedule: jsonb('prayer_schedule'), // daily prayer times
  islamicProgram: jsonb('islamic_program'), // religious activities schedule
  
  // Transportation
  transportationDetails: jsonb('transportation_details'), // local transport in Saudi
  
  // Special arrangements
  specialArrangements: text('special_arrangements'),
  dietaryArrangements: jsonb('dietary_arrangements'),
  medicalArrangements: text('medical_arrangements'),
  
  // Tracking and communication
  trackingEnabled: varchar('tracking_enabled', { length: 10 }).default('true'),
  emergencyContacts: jsonb('emergency_contacts'),
  
  // Package status
  packageStatus: varchar('package_status', { length: 20 }).default('confirmed'), // confirmed, in_progress, completed, cancelled
  
  // Completion and feedback
  completionDate: timestamp('completion_date'),
  feedback: text('feedback'),
  rating: varchar('rating', { length: 10 }),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type UmrohPackage = typeof umrohPackages.$inferSelect;
export type NewUmrohPackage = typeof umrohPackages.$inferInsert;