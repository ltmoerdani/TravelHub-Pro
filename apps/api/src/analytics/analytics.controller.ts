import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('revenue')
  getRevenueData(@Query('timeRange') timeRange: string) {
    return this.analyticsService.getRevenueData(timeRange);
  }

  @Get('products')
  getProductPerformance() {
    return this.analyticsService.getProductPerformance();
  }

  @Get('customers')
  getCustomerSegments() {
    return this.analyticsService.getCustomerSegments();
  }

  @Get('channels')
  getBookingChannels() {
    return this.analyticsService.getBookingChannels();
  }

  @Get('umroh')
  getUmrohAnalytics() {
    return this.analyticsService.getUmrohAnalytics();
  }
}