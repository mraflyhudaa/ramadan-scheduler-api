// File: src/utils/prayerCalculation.ts
import { Location } from '../types';
import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';

interface DailyPrayerTimes {
  sahurStart: string;
  fajr: string;
  maghrib: string;
}

export const calculatePrayerTimes = (date: Date, location: Location): DailyPrayerTimes => {
  // Using Adhan library to calculate prayer times
  const coordinates = new Coordinates(location.latitude, location.longitude);
  
  // Use appropriate calculation method (using Muslim World League as default)
  const params = CalculationMethod.MuslimWorldLeague();
  
  // You can adjust parameters if needed
  // params.madhab = Madhab.Hanafi;
  // params.adjustments.fajr = 2;
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  
  // Format times as HH:MM in 24-hour format
  const formatTime = (date: Date): string => {
    return date.getHours().toString().padStart(2, '0') + ':' + 
           date.getMinutes().toString().padStart(2, '0');
  };
  
  // Calculate sahurStart (typically 1.5 hours before fajr)
  const fajrTime = prayerTimes.fajr;
  const sahurStartTime = new Date(fajrTime);
  sahurStartTime.setMinutes(fajrTime.getMinutes() - 90);
  
  return {
    sahurStart: formatTime(sahurStartTime),
    fajr: formatTime(prayerTimes.fajr),
    maghrib: formatTime(prayerTimes.maghrib)
  };
};