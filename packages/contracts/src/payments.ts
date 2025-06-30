import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  EWALLET = 'ewallet',
  CASH = 'cash',
  ISLAMIC_BANKING = 'islamic_banking',
}

export enum PaymentGateway {
  MIDTRANS = 'midtrans',
  XENDIT = 'xendit',
  MANUAL = 'manual',
}

export class ProcessPaymentDto {
  @IsString()
  bookingId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentGateway)
  paymentGateway?: PaymentGateway;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  installmentPlan?: any;
}

export class CreateInstallmentPlanDto {
  @IsString()
  bookingId: string;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  installments: number;

  @IsOptional()
  @IsNumber()
  downPaymentPercent?: number;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: PaymentMethod;
  paymentGateway?: PaymentGateway;
  isShariahCompliant: boolean;
  installmentPlan?: any;
  mudharabahDetails?: any;
  gatewayResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}