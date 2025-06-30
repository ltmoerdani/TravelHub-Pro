import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';
import { getPrayerTimes, getQiblaDirection, generateUmrohItinerary } from '@travel-agency/utils';

@Injectable()
export class UmrohService {
  constructor(private db: DatabaseService) {}

  async createUmrohPackage(packageData: any) {
    // Create specialized Umroh package
    const itinerary = generateUmrohItinerary(packageData.duration);
    
    return {
      id: `UMROH${Date.now()}`,
      ...packageData,
      itinerary,
      islamicFeatures: {
        prayerTimesIncluded: true,
        qiblaDirection: true,
        halalMealsOnly: true,
        islamicGuidance: true,
        muthawifLanguage: 'Indonesian',
        groupPrayers: true,
      },
      visaProcessing: {
        included: true,
        processingTime: '14-21 days',
        requirements: [
          'Passport valid 6+ months',
          'Vaccination certificate',
          'Health certificate',
          'Mahram documentation (for women)',
        ],
      },
      accommodation: {
        makkahHotel: packageData.makkahHotel || 'Hilton Makkah Convention',
        madinahHotel: packageData.madinahHotel || 'Pullman Zamzam Madina',
        roomType: packageData.roomType || 'Quad sharing',
        distanceToHaram: {
          makkah: '200m walking',
          madinah: '100m walking',
        },
      },
      createdAt: new Date(),
    };
  }

  async getPrayerTimes(latitude: number, longitude: number, date?: Date) {
    const prayerDate = date || new Date();
    return getPrayerTimes(prayerDate, latitude, longitude);
  }

  async getQiblaDirection(latitude: number, longitude: number) {
    return {
      direction: getQiblaDirection(latitude, longitude),
      distance: this.calculateDistanceToKaaba(latitude, longitude),
    };
  }

  async trackJamaahLocation(groupId: string, location: any) {
    // Mock jamaah tracking
    return {
      groupId,
      location,
      timestamp: new Date(),
      nearbyMosques: [
        { name: 'Masjid Al-Haram', distance: '0.2 km' },
        { name: 'Masjid Nabawi', distance: '1.5 km' },
      ],
      prayerTime: await this.getPrayerTimes(location.latitude, location.longitude),
    };
  }

  async getIslamicCalendar() {
    // Mock Islamic calendar
    return {
      hijriDate: '15 Rajab 1445',
      islamicEvents: [
        { name: 'Isra Miraj', date: '27 Rajab 1445', daysUntil: 12 },
        { name: 'Ramadan', date: '1 Ramadan 1445', daysUntil: 45 },
      ],
      prayerReminders: true,
    };
  }

  async generateMudharabahContract(bookingId: string, amount: number) {
    // Generate Shariah-compliant contract
    return {
      contractId: `MDH${Date.now()}`,
      bookingId,
      contractType: 'Mudharabah',
      amount,
      terms: {
        profitSharing: '0% (No interest)',
        paymentSchedule: 'Flexible installments',
        shariahCompliance: true,
        witnessRequired: true,
      },
      islamicPrinciples: [
        'No Riba (Interest)',
        'No Gharar (Excessive uncertainty)',
        'No Haram activities',
        'Mutual consent (Ridha)',
      ],
      generatedAt: new Date(),
    };
  }

  private calculateDistanceToKaaba(lat: number, lng: number): string {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const R = 6371; // Earth's radius in km
    const dLat = (kaabaLat - lat) * Math.PI / 180;
    const dLng = (kaabaLng - lng) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat * Math.PI / 180) * Math.cos(kaabaLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return `${Math.round(distance)} km`;
  }
}