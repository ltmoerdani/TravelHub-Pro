import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum CustomerType {
  NEW = 'new',
  REGULAR = 'regular',
  VIP = 'vip',
}

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  idNumber?: string;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsDateString()
  passportExpiry?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  islamicProfile?: any;

  @IsOptional()
  medicalInfo?: any;

  @IsOptional()
  @IsString()
  specialRequirements?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  customerType: CustomerType;
  loyaltyPoints: number;
  totalBookings: number;
  totalSpent: number;
  islamicProfile?: any;
  medicalInfo?: any;
  specialRequirements?: string;
  createdAt: Date;
  updatedAt: Date;
}