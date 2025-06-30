import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';

export enum ProductType {
  TRAVEL = 'travel',
  HOTEL = 'hotel',
  UMROH = 'umroh',
  HAJI = 'haji',
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductType)
  type: ProductType;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  inclusions?: string[];

  @IsOptional()
  @IsArray()
  exclusions?: string[];

  @IsOptional()
  itinerary?: any[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  islamicFeatures?: any;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  inclusions?: string[];

  @IsOptional()
  @IsArray()
  exclusions?: string[];

  @IsOptional()
  itinerary?: any[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  islamicFeatures?: any;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  description?: string;
  price: number;
  currency: string;
  duration?: string;
  capacity: number;
  location?: string;
  status: ProductStatus;
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: any[];
  images?: string[];
  islamicFeatures?: any;
  createdAt: Date;
  updatedAt: Date;
}