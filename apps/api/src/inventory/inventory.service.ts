import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class InventoryService {
  constructor(private db: DatabaseService) {}

  async findAll(filters?: any) {
    // Mock inventory data
    return [
      {
        id: 'INV001',
        productId: '1',
        inventoryType: 'hotel_room',
        totalCapacity: 50,
        availableCapacity: 32,
        reservedCapacity: 18,
        availableFrom: '2024-01-01',
        availableTo: '2024-12-31',
        basePrice: 1200000,
        currency: 'IDR',
        seasonalMultiplier: 1.2,
        demandMultiplier: 1.1,
        roomType: 'Deluxe Room',
        roomAmenities: ['AC', 'WiFi', 'TV', 'Minibar'],
        maxOccupancy: 2,
        status: 'active',
      },
      {
        id: 'INV002',
        productId: '2',
        inventoryType: 'flight_seat',
        totalCapacity: 180,
        availableCapacity: 45,
        reservedCapacity: 135,
        availableFrom: '2024-02-01',
        availableTo: '2024-02-28',
        basePrice: 8500000,
        currency: 'IDR',
        seasonalMultiplier: 1.5,
        demandMultiplier: 1.3,
        flightNumber: 'GA865',
        departureTime: '2024-02-20T10:30:00Z',
        arrivalTime: '2024-02-20T14:45:00Z',
        aircraft: 'Boeing 777-300ER',
        seatClass: 'Economy',
        status: 'active',
      },
    ];
  }

  async findOne(id: string) {
    const inventory = await this.findAll();
    return inventory.find(inv => inv.id === id);
  }

  async create(inventoryData: any) {
    return {
      id: `INV${Date.now()}`,
      ...inventoryData,
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

  async checkAvailability(inventoryId: string, params: any) {
    const { startDate, endDate, quantity = 1 } = params;
    
    // Mock availability check
    return {
      inventoryId,
      isAvailable: true,
      availableQuantity: 25,
      requestedQuantity: quantity,
      pricePerUnit: 1320000, // with dynamic pricing applied
      totalPrice: 1320000 * quantity,
      appliedRules: [
        { ruleName: 'High Season', adjustment: '+20%' },
        { ruleName: 'High Demand', adjustment: '+10%' },
      ],
    };
  }

  async allocateInventory(inventoryId: string, allocationData: any) {
    const { bookingId, quantity, unitPrice } = allocationData;
    
    return {
      allocationId: `ALLOC${Date.now()}`,
      inventoryId,
      bookingId,
      quantityAllocated: quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      status: 'allocated',
      allocationDate: new Date(),
    };
  }

  async releaseInventory(inventoryId: string, releaseData: any) {
    const { allocationId, reason } = releaseData;
    
    return {
      allocationId,
      inventoryId,
      status: 'released',
      reason,
      releasedAt: new Date(),
    };
  }

  async calculateDynamicPrice(params: any) {
    const { 
      inventoryId, 
      basePrice, 
      bookingDate, 
      travelDate, 
      quantity = 1,
      customerType = 'regular' 
    } = params;

    let finalPrice = basePrice;
    const appliedRules = [];

    // Seasonal pricing
    const travelMonth = new Date(travelDate).getMonth();
    if ([5, 6, 7, 11].includes(travelMonth)) { // High season
      finalPrice *= 1.2;
      appliedRules.push({ rule: 'High Season', multiplier: 1.2 });
    }

    // Demand-based pricing
    const daysUntilTravel = Math.ceil((new Date(travelDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilTravel < 7) { // Last minute
      finalPrice *= 1.15;
      appliedRules.push({ rule: 'Last Minute', multiplier: 1.15 });
    } else if (daysUntilTravel > 90) { // Early bird
      finalPrice *= 0.9;
      appliedRules.push({ rule: 'Early Bird', multiplier: 0.9 });
    }

    // Group discount
    if (quantity >= 10) {
      finalPrice *= 0.95;
      appliedRules.push({ rule: 'Group Discount', multiplier: 0.95 });
    }

    // Customer type discount
    if (customerType === 'vip') {
      finalPrice *= 0.92;
      appliedRules.push({ rule: 'VIP Discount', multiplier: 0.92 });
    }

    return {
      inventoryId,
      basePrice,
      finalPrice: Math.round(finalPrice),
      totalPrice: Math.round(finalPrice * quantity),
      quantity,
      appliedRules,
      calculatedAt: new Date(),
    };
  }
}