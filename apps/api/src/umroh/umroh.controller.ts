import { Controller, Post, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UmrohService } from './umroh.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Umroh & Islamic Services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('umroh')
export class UmrohController {
  constructor(private umrohService: UmrohService) {}

  @Post('package')
  createUmrohPackage(@Body() packageData: any) {
    return this.umrohService.createUmrohPackage(packageData);
  }

  @Get('prayer-times')
  getPrayerTimes(
    @Query('lat') latitude: number,
    @Query('lng') longitude: number,
    @Query('date') date?: string
  ) {
    const prayerDate = date ? new Date(date) : undefined;
    return this.umrohService.getPrayerTimes(latitude, longitude, prayerDate);
  }

  @Get('qibla')
  getQiblaDirection(
    @Query('lat') latitude: number,
    @Query('lng') longitude: number
  ) {
    return this.umrohService.getQiblaDirection(latitude, longitude);
  }

  @Post('track-jamaah')
  trackJamaahLocation(@Body() trackingData: any) {
    return this.umrohService.trackJamaahLocation(trackingData.groupId, trackingData.location);
  }

  @Get('islamic-calendar')
  getIslamicCalendar() {
    return this.umrohService.getIslamicCalendar();
  }

  @Post('mudharabah-contract')
  generateMudharabahContract(@Body() contractData: any) {
    return this.umrohService.generateMudharabahContract(contractData.bookingId, contractData.amount);
  }
}