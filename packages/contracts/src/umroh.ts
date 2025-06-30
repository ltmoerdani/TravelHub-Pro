import { IsString, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateUmrohPackageDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number; // in days

  @IsNumber()
  price: number;

  @IsString()
  departureAirport: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  returnDate: string;

  @IsOptional()
  @IsString()
  makkahHotel?: string;

  @IsOptional()
  @IsString()
  madinahHotel?: string;

  @IsOptional()
  @IsString()
  muthawifName?: string;

  @IsOptional()
  @IsString()
  groupLeader?: string;

  @IsOptional()
  @IsNumber()
  groupSize?: number;

  @IsOptional()
  islamicFeatures?: any;

  @IsOptional()
  @IsArray()
  inclusions?: string[];
}

export interface UmrohPackage {
  id: string;
  name: string;
  duration: number;
  price: number;
  departureAirport: string;
  departureDate: Date;
  returnDate: Date;
  makkahHotel: string;
  madinahHotel: string;
  muthawifName?: string;
  groupLeader?: string;
  groupSize?: number;
  islamicFeatures: any;
  visaProcessing: any;
  accommodation: any;
  itinerary: any[];
  createdAt: Date;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface QiblaInfo {
  direction: number; // degrees from north
  distance: string; // distance to Kaaba
}

export interface IslamicCalendar {
  hijriDate: string;
  islamicEvents: Array<{
    name: string;
    date: string;
    daysUntil: number;
  }>;
  prayerReminders: boolean;
}