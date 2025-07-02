import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class SearchService {
  constructor(private db: DatabaseService) {}

  async globalSearch(params: any) {
    const { q: query, type = 'all', limit = 20, offset = 0 } = params;
    
    if (!query || query.trim().length < 2) {
      return {
        results: [],
        total: 0,
        query,
        type,
      };
    }

    // Mock global search implementation
    const allResults = [
      // Products
      {
        id: 'PROD001',
        type: 'product',
        title: 'Umroh Premium 12 Hari',
        subtitle: 'Makkah & Madinah',
        description: 'Premium Umroh package with 5-star accommodation and experienced Muthawif',
        price: 35000000,
        rating: 4.9,
        category: 'umroh',
        location: 'Saudi Arabia',
        relevanceScore: 0.95,
      },
      {
        id: 'PROD002',
        type: 'product',
        title: 'Bali Paradise 5D4N',
        subtitle: 'Bali, Indonesia',
        description: 'Experience the beauty of Bali with comprehensive tour package',
        price: 4500000,
        rating: 4.8,
        category: 'travel',
        location: 'Bali',
        relevanceScore: 0.87,
      },
      // Customers
      {
        id: 'CUST001',
        type: 'customer',
        title: 'Ahmad Wijaya',
        subtitle: 'VIP Customer',
        description: 'Regular Umroh customer, 3 bookings, total spent: Rp 75,000,000',
        email: 'ahmad.wijaya@email.com',
        phone: '+62 812-3456-7890',
        location: 'Jakarta',
        relevanceScore: 0.92,
      },
      // Bookings
      {
        id: 'BOOK001',
        type: 'booking',
        title: 'TH-2024-001',
        subtitle: 'Umroh Premium - Ahmad Wijaya',
        description: 'Confirmed booking for 2 passengers, travel date: Feb 20, 2024',
        amount: 35000000,
        status: 'confirmed',
        travelDate: '2024-02-20',
        relevanceScore: 0.89,
      },
    ];

    // Filter by type if specified
    let filteredResults = type === 'all' ? allResults : allResults.filter(r => r.type === type);
    
    // Filter by query
    filteredResults = filteredResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
    );

    // Sort by relevance score
    filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Apply pagination
    const paginatedResults = filteredResults.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total: filteredResults.length,
      query,
      type,
      pagination: {
        limit,
        offset,
        hasMore: filteredResults.length > offset + limit,
      },
    };
  }

  async searchProducts(params: any) {
    const { q: query, category, priceMin, priceMax, location, rating } = params;
    
    // Mock product search with filters
    const products = [
      {
        id: 'PROD001',
        name: 'Umroh Premium 12 Hari',
        category: 'umroh',
        price: 35000000,
        location: 'Saudi Arabia',
        rating: 4.9,
        description: 'Premium Umroh package with 5-star accommodation',
      },
      {
        id: 'PROD002',
        name: 'Bali Paradise 5D4N',
        category: 'travel',
        price: 4500000,
        location: 'Bali',
        rating: 4.8,
        description: 'Beautiful Bali tour package',
      },
    ];

    let filteredProducts = products;

    // Apply filters
    if (query) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (priceMin) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(priceMin));
    }

    if (priceMax) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(priceMax));
    }

    if (location) {
      filteredProducts = filteredProducts.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (rating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= parseFloat(rating));
    }

    return {
      products: filteredProducts,
      total: filteredProducts.length,
      filters: {
        query,
        category,
        priceMin,
        priceMax,
        location,
        rating,
      },
    };
  }

  async searchCustomers(params: any) {
    const { q: query, customerType, location, joinDateFrom, joinDateTo } = params;
    
    // Mock customer search
    const customers = [
      {
        id: 'CUST001',
        name: 'Ahmad Wijaya',
        email: 'ahmad.wijaya@email.com',
        phone: '+62 812-3456-7890',
        customerType: 'vip',
        location: 'Jakarta',
        joinDate: '2023-03-15',
        totalBookings: 3,
        totalSpent: 75000000,
      },
      {
        id: 'CUST002',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+62 813-9876-5432',
        customerType: 'regular',
        location: 'Bali',
        joinDate: '2023-06-20',
        totalBookings: 2,
        totalSpent: 15500000,
      },
    ];

    let filteredCustomers = customers;

    if (query) {
      filteredCustomers = filteredCustomers.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query)
      );
    }

    if (customerType && customerType !== 'all') {
      filteredCustomers = filteredCustomers.filter(c => c.customerType === customerType);
    }

    if (location) {
      filteredCustomers = filteredCustomers.filter(c => 
        c.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return {
      customers: filteredCustomers,
      total: filteredCustomers.length,
      filters: {
        query,
        customerType,
        location,
        joinDateFrom,
        joinDateTo,
      },
    };
  }

  async searchBookings(params: any) {
    const { q: query, status, dateFrom, dateTo, agentId } = params;
    
    // Mock booking search
    const bookings = [
      {
        id: 'BOOK001',
        bookingNumber: 'TH-2024-001',
        customerName: 'Ahmad Wijaya',
        productName: 'Umroh Premium 12 Hari',
        amount: 35000000,
        status: 'confirmed',
        bookingDate: '2024-01-15',
        travelDate: '2024-02-20',
        agentId: 'AGT001',
      },
      {
        id: 'BOOK002',
        bookingNumber: 'TH-2024-002',
        customerName: 'Sarah Johnson',
        productName: 'Bali Paradise 5D4N',
        amount: 9000000,
        status: 'pending',
        bookingDate: '2024-01-14',
        travelDate: '2024-01-25',
        agentId: 'AGT002',
      },
    ];

    let filteredBookings = bookings;

    if (query) {
      filteredBookings = filteredBookings.filter(b => 
        b.bookingNumber.toLowerCase().includes(query.toLowerCase()) ||
        b.customerName.toLowerCase().includes(query.toLowerCase()) ||
        b.productName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status && status !== 'all') {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }

    if (agentId) {
      filteredBookings = filteredBookings.filter(b => b.agentId === agentId);
    }

    return {
      bookings: filteredBookings,
      total: filteredBookings.length,
      filters: {
        query,
        status,
        dateFrom,
        dateTo,
        agentId,
      },
    };
  }

  async getSearchSuggestions(query: string) {
    if (!query || query.length < 2) {
      return { suggestions: [] };
    }

    // Mock search suggestions
    const suggestions = [
      'Umroh Premium',
      'Bali Paradise',
      'Ahmad Wijaya',
      'TH-2024-001',
      'Jakarta',
      'Confirmed bookings',
      'VIP customers',
    ].filter(s => s.toLowerCase().includes(query.toLowerCase()));

    return {
      suggestions: suggestions.slice(0, 5),
      query,
    };
  }

  async getAvailableFilters(type: string) {
    const filterOptions = {
      products: {
        categories: ['all', 'umroh', 'haji', 'travel', 'hotel'],
        priceRanges: [
          { label: 'Under Rp 5M', min: 0, max: 5000000 },
          { label: 'Rp 5M - 20M', min: 5000000, max: 20000000 },
          { label: 'Rp 20M - 50M', min: 20000000, max: 50000000 },
          { label: 'Above Rp 50M', min: 50000000, max: null },
        ],
        locations: ['Bali', 'Jakarta', 'Yogyakarta', 'Saudi Arabia', 'Turkey'],
        ratings: [1, 2, 3, 4, 5],
      },
      customers: {
        types: ['all', 'vip', 'regular', 'new'],
        locations: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan'],
        joinDateRanges: [
          { label: 'Last 30 days', days: 30 },
          { label: 'Last 3 months', days: 90 },
          { label: 'Last 6 months', days: 180 },
          { label: 'Last year', days: 365 },
        ],
      },
      bookings: {
        statuses: ['all', 'confirmed', 'pending', 'cancelled', 'completed'],
        agents: [
          { id: 'AGT001', name: 'Sarah Wilson' },
          { id: 'AGT002', name: 'Ahmad Rahman' },
          { id: 'AGT003', name: 'Siti Nurhaliza' },
        ],
        dateRanges: [
          { label: 'Today', days: 1 },
          { label: 'Last 7 days', days: 7 },
          { label: 'Last 30 days', days: 30 },
          { label: 'Last 3 months', days: 90 },
        ],
      },
    };

    return filterOptions[type] || {};
  }
}