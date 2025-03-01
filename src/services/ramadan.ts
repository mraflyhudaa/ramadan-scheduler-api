import { RamadanDay, Location } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getLocationById } from './location';
import { calculatePrayerTimes } from '../utils/prayerCalculation';

// Mock database
const ramadanDays: RamadanDay[] = [];

// Ramadan 2025 is expected to start around March 1, 2025 (may vary by location)
const RAMADAN_START_DATE = '2025-03-01';

export const getScheduleForLocation = async (locationId: string): Promise<RamadanDay[]> => {
  return ramadanDays.filter(day => day.locationId === locationId);
};

export const getDayById = async (id: string): Promise<RamadanDay | undefined> => {
  return ramadanDays.find(day => day.id === id);
};

export const calculateSchedule = async (locationId: string): Promise<RamadanDay[]> => {
  const location = await getLocationById(locationId);
  
  if (!location) {
    throw new Error('Location not found');
  }
  
  const schedule: RamadanDay[] = [];
  
  // Generate schedule for 30 days of Ramadan
  for (let i = 0; i < 30; i++) {
    const date = new Date(RAMADAN_START_DATE);
    date.setDate(date.getDate() + i);
    
    const dateString = date.toISOString().split('T')[0];
    
    // Calculate prayer times for this day and location
    const prayerTimes = calculatePrayerTimes(date, location);
    
    const ramadanDay: RamadanDay = {
      id: uuidv4(),
      date: dateString,
      dayOfRamadan: i + 1,
      sahurStart: prayerTimes.sahurStart,  // Usually calculated as a time before Fajr
      sahurEnd: prayerTimes.fajr,          // Sahur ends at Fajr
      fajrTime: prayerTimes.fajr,
      iftarTime: prayerTimes.maghrib,      // Iftar begins at Maghrib
      maghribTime: prayerTimes.maghrib,
      locationId: location.id
    };
    
    schedule.push(ramadanDay);
    ramadanDays.push(ramadanDay);  // Add to mock database
  }
  
  return schedule;
};