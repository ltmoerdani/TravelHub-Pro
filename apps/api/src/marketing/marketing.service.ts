import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class MarketingService {
  constructor(private db: DatabaseService) {}

  async getCampaigns(filters?: any) {
    // Mock campaigns data
    return [
      {
        id: 'CAM001',
        campaignName: 'Ramadan Umroh Special',
        campaignType: 'email',
        category: 'promotional',
        subject: 'Special Ramadan Umroh Packages - Limited Time!',
        status: 'completed',
        scheduledAt: '2024-01-10T09:00:00Z',
        totalSent: 2500,
        totalDelivered: 2450,
        totalOpened: 1225,
        totalClicked: 245,
        totalConverted: 12,
        budget: 5000000,
        totalCost: 3750000,
        createdAt: '2024-01-05T10:00:00Z',
      },
      {
        id: 'CAM002',
        campaignName: 'Early Bird Bali Packages',
        campaignType: 'whatsapp',
        category: 'promotional',
        subject: 'Book Early & Save 20% on Bali Packages',
        status: 'running',
        scheduledAt: '2024-01-15T08:00:00Z',
        totalSent: 1200,
        totalDelivered: 1180,
        totalOpened: 850,
        totalClicked: 170,
        totalConverted: 8,
        budget: 3000000,
        totalCost: 1800000,
        createdAt: '2024-01-12T14:00:00Z',
      },
    ];
  }

  async createCampaign(campaignData: any) {
    return {
      id: `CAM${Date.now()}`,
      ...campaignData,
      status: 'draft',
      totalSent: 0,
      totalDelivered: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalConverted: 0,
      totalCost: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateCampaign(id: string, updateData: any) {
    return {
      id,
      ...updateData,
      updatedAt: new Date(),
    };
  }

  async sendCampaign(campaignId: string) {
    // Mock campaign sending
    return {
      campaignId,
      status: 'sending',
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      targetAudience: 2500,
      message: 'Campaign is being sent to target audience',
    };
  }

  async getCampaignAnalytics(campaignId: string) {
    // Mock campaign analytics
    return {
      campaignId,
      overview: {
        totalSent: 2500,
        deliveryRate: 98.0,
        openRate: 50.0,
        clickRate: 10.0,
        conversionRate: 0.48,
        roi: 320.0,
      },
      timeline: [
        { hour: '09:00', sent: 500, opened: 125, clicked: 25 },
        { hour: '10:00', sent: 800, opened: 200, clicked: 40 },
        { hour: '11:00', sent: 1200, opened: 300, clicked: 60 },
      ],
      topLinks: [
        { url: '/umroh-packages', clicks: 150, conversions: 8 },
        { url: '/contact', clicks: 95, conversions: 4 },
      ],
      deviceBreakdown: {
        mobile: 65,
        desktop: 30,
        tablet: 5,
      },
    };
  }

  async getPromotions(filters?: any) {
    // Mock promotions data
    return [
      {
        id: 'PROMO001',
        promotionCode: 'RAMADAN2024',
        promotionName: 'Ramadan Special Discount',
        promotionType: 'discount',
        discountType: 'percentage',
        discountValue: 15.0,
        maxDiscountAmount: 5000000,
        minOrderAmount: 20000000,
        maxUsageTotal: 100,
        maxUsagePerCustomer: 1,
        currentUsage: 45,
        validFrom: '2024-01-01T00:00:00Z',
        validTo: '2024-03-31T23:59:59Z',
        isActive: true,
        isPublic: true,
        description: '15% discount for Umroh packages during Ramadan',
        applicableProducts: ['umroh', 'haji'],
      },
      {
        id: 'PROMO002',
        promotionCode: 'EARLYBIRD',
        promotionName: 'Early Bird Discount',
        promotionType: 'discount',
        discountType: 'percentage',
        discountValue: 10.0,
        maxDiscountAmount: 3000000,
        minOrderAmount: 10000000,
        maxUsageTotal: 200,
        maxUsagePerCustomer: 1,
        currentUsage: 78,
        validFrom: '2024-01-01T00:00:00Z',
        validTo: '2024-12-31T23:59:59Z',
        isActive: true,
        isPublic: true,
        description: 'Early bird discount for bookings 60 days in advance',
        applicableProducts: ['travel', 'hotel'],
      },
    ];
  }

  async createPromotion(promotionData: any) {
    return {
      id: `PROMO${Date.now()}`,
      promotionCode: promotionData.promotionCode.toUpperCase(),
      ...promotionData,
      currentUsage: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async validatePromotion(validationData: any) {
    const { promotionCode, customerId, orderAmount, productType } = validationData;
    
    // Mock validation logic
    const isValid = promotionCode === 'RAMADAN2024' && orderAmount >= 20000000;
    
    if (isValid) {
      const discountAmount = Math.min(orderAmount * 0.15, 5000000);
      return {
        isValid: true,
        promotionId: 'PROMO001',
        promotionCode,
        discountAmount,
        finalAmount: orderAmount - discountAmount,
        message: 'Promotion code applied successfully',
      };
    }
    
    return {
      isValid: false,
      message: 'Invalid promotion code or conditions not met',
    };
  }

  async applyPromotion(applicationData: any) {
    const { promotionId, customerId, bookingId, originalAmount, discountAmount } = applicationData;
    
    return {
      id: `USAGE${Date.now()}`,
      promotionId,
      customerId,
      bookingId,
      usageDate: new Date(),
      originalAmount,
      discountAmount,
      finalAmount: originalAmount - discountAmount,
      status: 'applied',
    };
  }

  async getMarketingOverview(params: any) {
    const { period = 'monthly' } = params;
    
    // Mock marketing overview
    return {
      period,
      campaigns: {
        total: 12,
        active: 3,
        completed: 8,
        draft: 1,
      },
      performance: {
        totalSent: 25000,
        averageOpenRate: 45.2,
        averageClickRate: 8.7,
        averageConversionRate: 1.2,
        totalConversions: 156,
        totalRevenue: 450000000,
        roi: 280.5,
      },
      promotions: {
        total: 8,
        active: 5,
        totalUsage: 234,
        totalDiscount: 125000000,
        conversionRate: 12.5,
      },
      topPerformingCampaigns: [
        { name: 'Ramadan Umroh Special', openRate: 50.0, conversionRate: 0.48, revenue: 180000000 },
        { name: 'Early Bird Bali', openRate: 42.3, conversionRate: 0.67, revenue: 95000000 },
      ],
      customerSegments: [
        { segment: 'VIP Customers', size: 245, engagement: 68.5, conversion: 3.2 },
        { segment: 'Regular Customers', size: 1850, engagement: 42.1, conversion: 1.8 },
        { segment: 'New Customers', size: 650, engagement: 35.7, conversion: 0.9 },
      ],
    };
  }
}