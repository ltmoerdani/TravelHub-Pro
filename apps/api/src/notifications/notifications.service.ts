import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class NotificationsService {
  constructor(private db: DatabaseService) {}

  async findAll(filters?: any) {
    const { type, priority, isRead, limit = 50 } = filters || {};
    
    // Mock notifications data
    return [
      {
        id: 'NOTIF001',
        type: 'booking',
        priority: 'high',
        title: 'New Umroh Booking',
        message: 'Ahmad Wijaya has booked Umroh Premium 12 Days package for Rp 35,000,000',
        timestamp: new Date(),
        isRead: false,
        actionRequired: true,
        relatedId: 'BK001',
        relatedType: 'booking',
        metadata: {
          customerName: 'Ahmad Wijaya',
          packageName: 'Umroh Premium 12 Days',
          amount: 35000000,
        },
      },
      {
        id: 'NOTIF002',
        type: 'payment',
        priority: 'medium',
        title: 'Payment Received',
        message: 'Payment of Rp 2,500,000 received for booking TH-2024-002',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false,
        actionRequired: false,
        relatedId: 'PAY002',
        relatedType: 'payment',
        metadata: {
          amount: 2500000,
          bookingNumber: 'TH-2024-002',
        },
      },
      {
        id: 'NOTIF003',
        type: 'document',
        priority: 'high',
        title: 'Document Expiring Soon',
        message: 'Passport for Sarah Johnson expires in 30 days',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true,
        actionRequired: true,
        relatedId: 'DOC003',
        relatedType: 'document',
        metadata: {
          customerName: 'Sarah Johnson',
          documentType: 'passport',
          expiryDate: '2024-02-15',
        },
      },
    ];
  }

  async getUnreadCount() {
    const notifications = await this.findAll();
    return {
      total: notifications.filter(n => !n.isRead).length,
      byType: {
        booking: notifications.filter(n => n.type === 'booking' && !n.isRead).length,
        payment: notifications.filter(n => n.type === 'payment' && !n.isRead).length,
        document: notifications.filter(n => n.type === 'document' && !n.isRead).length,
        system: notifications.filter(n => n.type === 'system' && !n.isRead).length,
      },
    };
  }

  async create(notificationData: any) {
    const notification = {
      id: `NOTIF${Date.now()}`,
      ...notificationData,
      timestamp: new Date(),
      isRead: false,
      createdAt: new Date(),
    };

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send real-time notification via WebSocket
    // 3. Send email/SMS if configured
    // 4. Push to mobile devices if applicable

    return notification;
  }

  async markAsRead(id: string) {
    // Mock implementation
    return {
      id,
      isRead: true,
      readAt: new Date(),
    };
  }

  async markAllAsRead() {
    // Mock implementation
    return {
      message: 'All notifications marked as read',
      updatedCount: 5,
      updatedAt: new Date(),
    };
  }

  async sendBulkNotification(bulkData: any) {
    const { recipients, title, message, type, priority } = bulkData;
    
    // Mock bulk notification sending
    const notifications = recipients.map((recipientId: string) => ({
      id: `NOTIF${Date.now()}_${recipientId}`,
      recipientId,
      title,
      message,
      type,
      priority,
      timestamp: new Date(),
      isRead: false,
    }));

    return {
      message: 'Bulk notifications sent successfully',
      sentCount: notifications.length,
      notifications,
    };
  }

  async getNotificationSettings() {
    // Mock notification settings
    return {
      email: {
        enabled: true,
        types: ['booking', 'payment', 'document'],
        frequency: 'immediate',
      },
      sms: {
        enabled: false,
        types: ['urgent', 'payment_failed'],
        frequency: 'immediate',
      },
      push: {
        enabled: true,
        types: ['booking', 'payment', 'system'],
        frequency: 'immediate',
      },
      inApp: {
        enabled: true,
        types: ['all'],
        frequency: 'immediate',
      },
      quietHours: {
        enabled: true,
        startTime: '22:00',
        endTime: '07:00',
        timezone: 'Asia/Jakarta',
      },
    };
  }

  async updateNotificationSettings(settings: any) {
    // Mock settings update
    return {
      message: 'Notification settings updated successfully',
      settings,
      updatedAt: new Date(),
    };
  }
}