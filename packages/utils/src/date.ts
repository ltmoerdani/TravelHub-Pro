import { format, parseISO, addDays, differenceInDays } from 'date-fns';

export function formatDate(date: Date | string, formatString: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss');
}

export function addBusinessDays(date: Date, days: number): Date {
  return addDays(date, days);
}

export function calculateDaysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInDays(end, start);
}

export function isValidTravelDate(travelDate: Date | string): boolean {
  const travel = typeof travelDate === 'string' ? parseISO(travelDate) : travelDate;
  const today = new Date();
  return travel > today;
}

export function getHijriDate(gregorianDate: Date = new Date()): string {
  // Simplified Hijri conversion - in production use proper Islamic calendar library
  const hijriYear = gregorianDate.getFullYear() - 579;
  const months = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
  ];
  
  const hijriMonth = months[gregorianDate.getMonth()];
  const hijriDay = gregorianDate.getDate();
  
  return `${hijriDay} ${hijriMonth} ${hijriYear} AH`;
}