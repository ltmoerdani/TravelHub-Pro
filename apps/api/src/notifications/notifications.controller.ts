import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.notificationsService.findAll(filters);
  }

  @Get('unread')
  getUnreadCount() {
    return this.notificationsService.getUnreadCount();
  }

  @Post()
  create(@Body() notificationData: any) {
    return this.notificationsService.create(notificationData);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('mark-all-read')
  markAllAsRead() {
    return this.notificationsService.markAllAsRead();
  }

  @Post('send-bulk')
  sendBulkNotification(@Body() bulkData: any) {
    return this.notificationsService.sendBulkNotification(bulkData);
  }

  @Get('settings')
  getNotificationSettings() {
    return this.notificationsService.getNotificationSettings();
  }

  @Patch('settings')
  updateNotificationSettings(@Body() settings: any) {
    return this.notificationsService.updateNotificationSettings(settings);
  }
}