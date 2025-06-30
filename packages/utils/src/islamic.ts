export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export function getPrayerTimes(date: Date, latitude: number, longitude: number): PrayerTimes {
  // This is a simplified implementation
  // In production, use a proper Islamic prayer time calculation library
  return {
    fajr: '04:30',
    sunrise: '06:00',
    dhuhr: '12:15',
    asr: '15:30',
    maghrib: '18:45',
    isha: '20:00',
  };
}

export function getQiblaDirection(latitude: number, longitude: number): number {
  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  
  const dLng = (kaabaLng - longitude) * Math.PI / 180;
  const lat1 = latitude * Math.PI / 180;
  const lat2 = kaabaLat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

export function isHalalPaymentMethod(method: string): boolean {
  const halalMethods = ['bank_transfer', 'cash', 'islamic_banking', 'mudharabah'];
  return halalMethods.includes(method.toLowerCase());
}

export function generateUmrohItinerary(days: number): Array<{
  day: number;
  location: string;
  activities: string[];
  prayers: string[];
}> {
  // Simplified Umroh itinerary generator
  const baseItinerary = [
    {
      day: 1,
      location: 'Madinah',
      activities: ['Arrival', 'Check-in hotel', 'Rest'],
      prayers: ['Maghrib at Masjid Nabawi', 'Isha at Masjid Nabawi'],
    },
    {
      day: 2,
      location: 'Madinah',
      activities: ['Ziyarah Masjid Nabawi', 'Raudhah visit', 'Islamic history tour'],
      prayers: ['All prayers at Masjid Nabawi'],
    },
    // Add more days based on package duration
  ];
  
  return baseItinerary.slice(0, days);
}