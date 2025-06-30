import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsDateString } from 'class-validator';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIAL = 'partial',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export class CreateBookingDto {
  @IsString()
  customerId: string;

  @IsString()
  productId: string;

  @IsDateString()
  travelDate: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @IsNumber()
  paxCount: number;

  @IsOptional()
  @IsArray()
  participants?: any[];

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsOptional()
  islamicRequirements?: any;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsDateString()
  travelDate?: string;

  @IsOptional()
  @IsNumber()
  paxCount?: number;

  @IsOptional()
  @IsString()
  specialRequests?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  productId: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  bookingDate: Date;
  travelDate: Date;
  returnDate?: Date;
  basePrice: number;
  totalPrice: number;
  paxCount: number;
  participants?: any[];
  specialRequests?: string;
  islamicRequirements?: any;
  createdAt: Date;
  updatedAt: Date;
}