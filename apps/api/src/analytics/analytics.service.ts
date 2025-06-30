import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class AnalyticsService {
  constructor(private db: DatabaseService) {}

  async getDashboardStats() {
    // Mock analytics data
    return {
      totalRevenue: 2400000000,
      totalBookings: 1247,
      totalCustomers: 12845,
      conversionRate: 24.8,
      revenueGrowth: 18.2,
      bookingsGrowth: 12.8,
      customersGrowth: 15.3,
      conversionGrowth: -2.1,
    };
  }

  async getRevenueData(timeRange: string = '6months') {
    // Mock revenue data
    return [
      { month: 'Jul', revenue: 850000000, bookings: 234, customers: 189 },
      { month: 'Aug', revenue: 920000000, bookings: 267, customers: 203 },
      { month: 'Sep', revenue: 1100000000, bookings: 312, customers: 245 },
      { month: 'Oct', revenue: 980000000, bookings: 298, customers: 231 },
      { month: 'Nov', revenue: 1250000000, bookings: 356, customers: 278 },
      { month: 'Dec', revenue: 1400000000, bookings: 398, customers: 312 },
    ];
  }

  async getProductPerformance() {
    return [
      { name: 'Regular Travel', revenue: 450000000, bookings: 145, growth: 12.5 },
      { name: 'Hotels', revenue: 320000000, bookings: 98, growth: -2.3 },
      { name: 'Umroh Packages', revenue: 890000000, bookings: 67, growth: 18.7 },
      { name: 'Haji Packages', revenue: 1200000000, bookings: 23, growth: 25.4 },
    ];
  }

  async getCustomerSegments() {
    return [
      { name: 'VIP Customers', value: 35, amount: 1200000000 },
      { name: 'Regular Customers', value: 45, amount: 850000000 },
      { name: 'New Customers', value: 20, amount: 320000000 },
    ];
  }

  async getBookingChannels() {
    return [
      { channel: 'Online Website', bookings: 45 },
      { channel: 'Mobile App', bookings: 25 },
      { channel: 'Office Counter', bookings: 20 },
      { channel: 'Phone Booking', bookings: 10 },
    ];
  }

  async getUmrohAnalytics() {
    return {
      totalUmrohBookings: 156,
      averagePackageValue: 42000000,
      popularDestinations: ['Makkah Premium', 'Madinah Deluxe', 'Combined Package'],
      seasonalTrends: [
        { month: 'Ramadan', bookings: 45, revenue: 1890000000 },
        { month: 'Hajj Season', bookings: 23, revenue: 966000000 },
        { month: 'Regular', bookings: 88, revenue: 3696000000 },
      ],
      visaApprovalRate: 98.5,
      customerSatisfaction: 4.8,
    };
  }
}