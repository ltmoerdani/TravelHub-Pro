import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async findByEmail(email: string) {
    // Mock implementation - replace with actual database query
    return {
      id: '1',
      email: email,
      password: '$2a$10$example.hash', // bcrypt hash
      name: 'John Doe',
      role: 'agent',
      phone: '+62812345678',
      isActive: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async create(userData: any) {
    // Mock implementation - replace with actual database insert
    return {
      id: Date.now().toString(),
      ...userData,
      isActive: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findById(id: string) {
    // Mock implementation
    return {
      id,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'agent',
      phone: '+62812345678',
      isActive: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}