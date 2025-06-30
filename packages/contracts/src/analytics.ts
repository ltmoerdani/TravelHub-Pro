export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  totalCustomers: number;
  conversionRate: number;
  revenueGrowth: number;
  bookingsGrowth: number;
  customersGrowth: number;
  conversionGrowth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
  customers: number;
}

export interface ProductPerformance {
  name: string;
  revenue: number;
  bookings: number;
  growth: number;
}

export interface CustomerSegment {
  name: string;
  value: number;
  amount: number;
}

export interface BookingChannel {
  channel: string;
  bookings: number;
}

export interface UmrohAnalytics {
  totalUmrohBookings: number;
  averagePackageValue: number;
  popularDestinations: string[];
  seasonalTrends: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
  visaApprovalRate: number;
  customerSatisfaction: number;
}