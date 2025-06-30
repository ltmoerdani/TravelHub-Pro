import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('process')
  processPayment(@Body() paymentData: any) {
    return this.paymentsService.processPayment(paymentData);
  }

  @Post('webhook')
  handleWebhook(@Body() webhookData: any) {
    return this.paymentsService.handleWebhook(webhookData);
  }

  @Get(':id/status')
  getPaymentStatus(@Param('id') id: string) {
    return this.paymentsService.getPaymentStatus(id);
  }

  @Post('installment')
  createInstallmentPlan(@Body() planData: any) {
    return this.paymentsService.createInstallmentPlan(planData.bookingId, planData);
  }
}