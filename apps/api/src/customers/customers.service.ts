import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class CustomersService {
  constructor(private db: DatabaseService) {}

  async findAll(filters?: any) {
    // Mock data
    return [
      {
        id: '1',
        name: 'Ahmad Wijaya',
        email: 'ahmad.wijaya@email.com',
        phone: '+62 812-3456-7890',
        address: 'Jakarta Selatan, Indonesia',
        customerType: 'vip',
        totalBookings: 3,
        totalSpent: 75000000,
        lastBooking: '2024-01-15',
        joinDate: '2023-03-15',
        preferredType: 'umroh',
        rating: 4.9,
        notes: 'Regular umroh customer, prefers premium packages',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+62 813-9876-5432',
        address: 'Bali, Indonesia',
        customerType: 'regular',
        totalBookings: 2,
        totalSpent: 15500000,
        lastBooking: '2024-01-14',
        joinDate: '2023-06-20',
        preferredType: 'travel',
        rating: 4.7,
        notes: 'Loves beach destinations, honeymooner',
      },
    ];
  }

  async findOne(id: string) {
    const customers = await this.findAll();
    return customers.find(c => c.id === id);
  }

  async create(customerData: any) {
    return {
      id: Date.now().toString(),
      ...customerData,
      customerType: 'new',
      totalBookings: 0,
      totalSpent: 0,
      loyaltyPoints: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}