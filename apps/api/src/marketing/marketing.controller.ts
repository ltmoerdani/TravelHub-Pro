import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Marketing & Promotions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('marketing')
export class MarketingController {
  constructor(private marketingService: MarketingService) {}

  @Get('campaigns')
  getCampaigns(@Query() filters: any) {
    return this.marketingService.getCampaigns(filters);
  }

  @Post('campaigns')
  createCampaign(@Body() campaignData: any) {
    return this.marketingService.createCampaign(campaignData);
  }

  @Patch('campaigns/:id')
  updateCampaign(@Param('id') id: string, @Body() updateData: any) {
    return this.marketingService.updateCampaign(id, updateData);
  }

  @Post('campaigns/:id/send')
  sendCampaign(@Param('id') id: string) {
    return this.marketingService.sendCampaign(id);
  }

  @Get('campaigns/:id/analytics')
  getCampaignAnalytics(@Param('id') id: string) {
    return this.marketingService.getCampaignAnalytics(id);
  }

  @Get('promotions')
  getPromotions(@Query() filters: any) {
    return this.marketingService.getPromotions(filters);
  }

  @Post('promotions')
  createPromotion(@Body() promotionData: any) {
    return this.marketingService.createPromotion(promotionData);
  }

  @Post('promotions/validate')
  validatePromotion(@Body() validationData: any) {
    return this.marketingService.validatePromotion(validationData);
  }

  @Post('promotions/apply')
  applyPromotion(@Body() applicationData: any) {
    return this.marketingService.applyPromotion(applicationData);
  }

  @Get('analytics/overview')
  getMarketingOverview(@Query() params: any) {
    return this.marketingService.getMarketingOverview(params);
  }
}