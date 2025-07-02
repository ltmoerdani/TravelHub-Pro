import { Component, JSX, splitProps, createSignal, onMount } from "solid-js";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface PrayerTimesProps extends JSX.HTMLAttributes<HTMLDivElement> {
  latitude?: number;
  longitude?: number;
}

export const PrayerTimes: Component<PrayerTimesProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "latitude", "longitude"]);
  const [prayerTimes, setPrayerTimes] = createSignal({
    fajr: "04:30",
    sunrise: "06:00", 
    dhuhr: "12:15",
    asr: "15:30",
    maghrib: "18:45",
    isha: "20:00"
  });

  const [currentTime, setCurrentTime] = createSignal(new Date());

  onMount(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const formatTime = (time: string) => {
    return time;
  };

  const getCurrentPrayer = () => {
    const now = currentTime().getHours() * 60 + currentTime().getMinutes();
    const times = prayerTimes();
    
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    if (now < timeToMinutes(times.fajr)) return 'isha';
    if (now < timeToMinutes(times.sunrise)) return 'fajr';
    if (now < timeToMinutes(times.dhuhr)) return 'sunrise';
    if (now < timeToMinutes(times.asr)) return 'dhuhr';
    if (now < timeToMinutes(times.maghrib)) return 'asr';
    if (now < timeToMinutes(times.isha)) return 'maghrib';
    return 'isha';
  };

  return (
    <Card class={cn("w-full", local.class)} {...others}>
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <span class="text-lg">🕌</span>
          <span>Prayer Times</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          {Object.entries(prayerTimes()).map(([prayer, time]) => (
            <div 
              class={`flex items-center justify-between p-2 rounded-lg ${
                getCurrentPrayer() === prayer ? 'bg-green-100 text-green-800' : 'bg-gray-50'
              }`}
            >
              <span class="font-medium capitalize">{prayer}</span>
              <span class="font-mono">{formatTime(time)}</span>
            </div>
          ))}
        </div>
        <div class="mt-4 text-center text-sm text-gray-600">
          Current: {currentTime().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

interface QiblaCompassProps extends JSX.HTMLAttributes<HTMLDivElement> {
  latitude?: number;
  longitude?: number;
}

export const QiblaCompass: Component<QiblaCompassProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "latitude", "longitude"]);
  const [qiblaDirection, setQiblaDirection] = createSignal(285); // Default direction

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const dLng = (kaabaLng - lng) * Math.PI / 180;
    const lat1 = lat * Math.PI / 180;
    const lat2 = kaabaLat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    
    return bearing;
  };

  return (
    <Card class={cn("w-full", local.class)} {...others}>
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <span class="text-lg">🧭</span>
          <span>Qibla Direction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col items-center space-y-4">
          <div class="relative w-32 h-32">
            <div class="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div 
              class="absolute inset-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center transform transition-transform duration-500"
              style={{ transform: `rotate(${qiblaDirection()}deg)` }}
            >
              <div class="w-1 h-8 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600">N</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{qiblaDirection()}°</div>
            <div class="text-sm text-gray-600">Direction to Kaaba</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface IslamicCalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const IslamicCalendar: Component<IslamicCalendarProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  
  const hijriDate = "15 Rajab 1445 AH";
  const islamicEvents = [
    { name: "Isra Miraj", date: "27 Rajab 1445", daysUntil: 12 },
    { name: "Ramadan", date: "1 Ramadan 1445", daysUntil: 45 },
    { name: "Eid al-Fitr", date: "1 Shawwal 1445", daysUntil: 75 }
  ];

  return (
    <Card class={cn("w-full", local.class)} {...others}>
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <span class="text-lg">📅</span>
          <span>Islamic Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-lg font-bold text-green-800">{hijriDate}</div>
            <div class="text-sm text-green-600">Today's Hijri Date</div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-gray-900">Upcoming Events</h4>
            {islamicEvents.map((event) => (
              <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div class="font-medium text-sm">{event.name}</div>
                  <div class="text-xs text-gray-600">{event.date}</div>
                </div>
                <div class="text-xs text-blue-600 font-medium">
                  {event.daysUntil} days
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};