import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class AgentsService {
  constructor(private db: DatabaseService) {}

  async findAll(filters?: any) {
    // Mock agents data
    return [
      {
        id: 'AGT001',
        userId: 'USR001',
        agentCode: 'AG001',
        name: 'Sarah Wilson',
        email: 'sarah@travelhub.com',
        agentLevel: 'senior',
        territory: 'Jakarta',
        baseCommissionRate: 7.5,
        bonusCommissionRate: 2.0,
        totalSales: 125000000,
        totalCommission: 9375000,
        monthlyTarget: 50000000,
        specializations: ['umroh', 'travel'],
        languages: ['Indonesian', 'English', 'Arabic'],
        isActive: true,
        joinDate: '2023-01-15',
        lastActiveAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 'AGT002',
        userId: 'USR002',
        agentCode: 'AG002',
        name: 'Ahmad Rahman',
        email: 'ahmad@travelhub.com',
        agentLevel: 'junior',
        territory: 'Surabaya',
        baseCommissionRate: 5.0,
        bonusCommissionRate: 1.0,
        totalSales: 75000000,
        totalCommission: 3750000,
        monthlyTarget: 30000000,
        specializations: ['hotel', 'travel'],
        languages: ['Indonesian', 'English'],
        isActive: true,
        joinDate: '2023-06-01',
        lastActiveAt: '2024-01-15T09:15:00Z',
      },
    ];
  }

  async findOne(id: string) {
    const agents = await this.findAll();
    return agents.find(agent => agent.id === id);
  }

  async create(agentData: any) {
    return {
      id: `AGT${Date.now()}`,
      agentCode: `AG${Date.now().toString().slice(-3)}`,
      ...agentData,
      totalSales: 0,
      totalCommission: 0,
      isActive: true,
      joinDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async update(id: string, updateData: any) {
    return {
      id,
      ...updateData,
      updatedAt: new Date(),
    };
  }

  async getPerformance(agentId: string, params: any) {
    const { period = 'monthly' } = params;
    
    // Mock performance data
    return {
      agentId,
      period,
      metrics: {
        totalSales: 125000000,
        totalCommission: 9375000,
        bookingsCount: 45,
        conversionRate: 24.5,
        averageOrderValue: 2777777,
        customerSatisfaction: 4.8,
      },
      targets: {
        salesTarget: 50000000,
        salesAchievement: 250, // percentage
        bookingsTarget: 20,
        bookingsAchievement: 225,
      },
      trends: [
        { month: 'Oct', sales: 35000000, bookings: 12 },
        { month: 'Nov', sales: 42000000, bookings: 15 },
        { month: 'Dec', sales: 48000000, bookings: 18 },
      ],
      ranking: {
        salesRank: 2,
        totalAgents: 25,
        percentile: 92,
      },
    };
  }

  async getCommissions(agentId: string, params: any) {
    const { period = 'current_month' } = params;
    
    // Mock commission data
    return [
      {
        id: 'COM001',
        bookingId: 'BK001',
        customerName: 'Ahmad Wijaya',
        productName: 'Umroh Premium 12 Hari',
        salesAmount: 35000000,
        commissionRate: 7.5,
        commissionAmount: 2625000,
        commissionType: 'base',
        paymentStatus: 'paid',
        paymentDate: '2024-01-10',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
      },
      {
        id: 'COM002',
        bookingId: 'BK002',
        customerName: 'Sarah Johnson',
        productName: 'Bali Paradise 5D4N',
        salesAmount: 9000000,
        commissionRate: 7.5,
        commissionAmount: 675000,
        commissionType: 'base',
        paymentStatus: 'pending',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
      },
    ];
  }

  async createTask(agentId: string, taskData: any) {
    return {
      id: `TASK${Date.now()}`,
      agentId,
      ...taskData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getTasks(agentId: string, filters?: any) {
    // Mock tasks data
    return [
      {
        id: 'TASK001',
        agentId,
        taskType: 'follow_up',
        title: 'Follow up with Ahmad Wijaya',
        description: 'Check on Umroh preparation progress',
        priority: 'high',
        dueDate: '2024-01-20',
        status: 'pending',
        customerName: 'Ahmad Wijaya',
        bookingNumber: 'TH-2024-001',
        createdAt: '2024-01-15',
      },
      {
        id: 'TASK002',
        agentId,
        taskType: 'document_collection',
        title: 'Collect passport copy from Sarah',
        description: 'Need passport copy for visa processing',
        priority: 'medium',
        dueDate: '2024-01-18',
        status: 'in_progress',
        customerName: 'Sarah Johnson',
        bookingNumber: 'TH-2024-002',
        createdAt: '2024-01-14',
      },
    ];
  }

  async updateTask(taskId: string, updateData: any) {
    return {
      id: taskId,
      ...updateData,
      updatedAt: new Date(),
    };
  }
}