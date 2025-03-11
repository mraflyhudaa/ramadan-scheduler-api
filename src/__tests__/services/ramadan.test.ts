import { getScheduleForLocation, getDayById, calculateSchedule } from '../../services/ramadan';
import { getLocationById } from '../../services/location';
import { calculatePrayerTimes } from '../../utils/prayerCalculation';

// Mock dependencies
jest.mock('../../services/location');
jest.mock('../../utils/prayerCalculation');
jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

describe('Ramadan Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateSchedule', () => {
    it('should calculate and return a schedule for a valid location', async () => {
      // Mock location service
      const mockLocation = {
        id: 'location-1',
        city: 'Mecca',
        country: 'Saudi Arabia',
        latitude: 21.4225,
        longitude: 39.8262,
        timezone: 'Asia/Riyadh'
      };
      (getLocationById as jest.Mock).mockResolvedValue(mockLocation);

      // Mock prayer calculation
      const mockPrayerTimes = {
        sahurStart: '04:00',
        fajr: '05:30',
        maghrib: '18:45'
      };
      (calculatePrayerTimes as jest.Mock).mockReturnValue(mockPrayerTimes);

      // Call the service
      const result = await calculateSchedule('location-1');

      // Assertions
      expect(result).toHaveLength(30); // 30 days of Ramadan
      expect(getLocationById).toHaveBeenCalledWith('location-1');
      expect(calculatePrayerTimes).toHaveBeenCalledTimes(30);
      
      // Check the first day
      expect(result[0]).toEqual({
        id: 'mock-uuid',
        date: expect.any(String),
        dayOfRamadan: 1,
        sahurStart: '04:00',
        sahurEnd: '05:30',
        fajrTime: '05:30',
        iftarTime: '18:45',
        maghribTime: '18:45',
        locationId: 'location-1'
      });
    });

    it('should throw an error if location is not found', async () => {
      // Mock location service to return null
      (getLocationById as jest.Mock).mockResolvedValue(null);

      // Call the service and expect it to throw
      await expect(calculateSchedule('invalid-id')).rejects.toThrow('Location not found');
    });
  });

  describe('getScheduleForLocation', () => {
    it('should return the schedule for a specific location', async () => {
      // This is a bit tricky because we're using an in-memory array
      // We'll populate it through the calculateSchedule function first
      
      // Setup mocks
      const mockLocation = {
        id: 'location-2',
        city: 'Mecca',
        country: 'Saudi Arabia',
        latitude: 21.4225,
        longitude: 39.8262,
        timezone: 'Asia/Riyadh'
      };
      (getLocationById as jest.Mock).mockResolvedValue(mockLocation);

      const mockPrayerTimes = {
        sahurStart: '04:00',
        fajr: '05:30',
        maghrib: '18:45'
      };
      (calculatePrayerTimes as jest.Mock).mockReturnValue(mockPrayerTimes);

      // Calculate schedule to populate the internal array
      await calculateSchedule('location-2');
      
      // Now get the schedule
      const result = await getScheduleForLocation('location-2');
      
      // Assertions
      expect(result).toHaveLength(30);
      expect(result[0].locationId).toBe('location-2');
    });
  });

  describe('getDayById', () => {
    it('should return a specific day by ID', async () => {
      // Setup mocks and populate data
      const mockLocation = {
        id: 'location-3',
        city: 'Mecca',
        country: 'Saudi Arabia',
        latitude: 21.4225,
        longitude: 39.8262,
        timezone: 'Asia/Riyadh'
      };
      (getLocationById as jest.Mock).mockResolvedValue(mockLocation);

      const mockPrayerTimes = {
        sahurStart: '04:00',
        fajr: '05:30',
        maghrib: '18:45'
      };
      (calculatePrayerTimes as jest.Mock).mockReturnValue(mockPrayerTimes);

      // Calculate schedule to populate the internal array
      await calculateSchedule('location-3');
      
      // Get the first day's ID
      const days = await getScheduleForLocation('location-3');
      const firstDayId = days[0].id;
      
      // Get the specific day
      const result = await getDayById(firstDayId);
      
      // Assertions
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstDayId);
      expect(result?.dayOfRamadan).toBe(1);
    });

    it('should return undefined for non-existent ID', async () => {
      const result = await getDayById('non-existent-id');
      expect(result).toBeUndefined();
    });
  });
});