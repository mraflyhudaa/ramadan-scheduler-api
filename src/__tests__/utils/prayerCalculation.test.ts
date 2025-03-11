import { calculatePrayerTimes } from '../../utils/prayerCalculation';
import { Location } from '../../types';
import { PrayerTimes, Coordinates } from 'adhan';

// Mock adhan library
jest.mock('adhan', () => {
  const mockPrayerTimes = {
    fajr: new Date('2025-03-01T05:30:00'),
    maghrib: new Date('2025-03-01T18:45:00')
  };
  
  return {
    PrayerTimes: jest.fn().mockImplementation(() => mockPrayerTimes),
    Coordinates: jest.fn(),
    CalculationMethod: {
      MuslimWorldLeague: jest.fn().mockReturnValue({})
    }
  };
});

describe('Prayer Calculation Utility', () => {
  it('should calculate prayer times correctly', () => {
    // Test data
    const date = new Date('2025-03-01');
    const location: Location = {
      id: 'location-1',
      city: 'Mecca',
      country: 'Saudi Arabia',
      latitude: 21.4225,
      longitude: 39.8262,
      timezone: 'Asia/Riyadh'
    };
    
    // Call the function
    const result = calculatePrayerTimes(date, location);
    
    // Verify Adhan library was called correctly
    expect(Coordinates).toHaveBeenCalledWith(location.latitude, location.longitude);
    expect(PrayerTimes).toHaveBeenCalled();
    
    // Check results
    expect(result).toEqual({
      sahurStart: '04:00', // 1.5 hours before fajr (05:30)
      fajr: '05:30',
      maghrib: '18:45'
    });
  });
  
  it('should format times correctly', () => {
    // Override the mock implementation for this test
    const customMockPrayerTimes = {
      fajr: new Date('2025-03-01T04:05:00'),
      maghrib: new Date('2025-03-01T17:09:00')
    };
    
    (PrayerTimes as jest.Mock).mockReturnValueOnce(customMockPrayerTimes);
    
    // Test data
    const date = new Date('2025-03-01');
    const location: Location = {
      id: 'location-1',
      city: 'Mecca',
      country: 'Saudi Arabia',
      latitude: 21.4225,
      longitude: 39.8262,
      timezone: 'Asia/Riyadh'
    };
    
    // Call the function
    const result = calculatePrayerTimes(date, location);
    
    // Check results (ensuring hours and minutes are properly formatted with leading zeros)
    expect(result).toEqual({
      sahurStart: '02:35', // 1.5 hours (90 minutes) before fajr (04:05)
      fajr: '04:05',
      maghrib: '17:09'
    });
  });
});