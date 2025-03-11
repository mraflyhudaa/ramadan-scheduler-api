import request from 'supertest';
import app from '../app';
import * as locationService from '../services/location';
import * as ramadanService from '../services/ramadan';

// Mock the location and ramadan services
jest.mock('../services/location');
jest.mock('../services/ramadan');
jest.mock('../utils/prayerCalculation');

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/ramadan/schedule/:locationId', () => {
    it('should return a schedule for a valid location ID', async () => {
      // Mock data
      const mockLocationId = 'location-1';
      const mockSchedule = [
        {
          id: 'day-1',
          date: '2025-03-01',
          dayOfRamadan: 1,
          sahurStart: '04:00',
          sahurEnd: '05:30',
          fajrTime: '05:30',
          iftarTime: '18:45',
          maghribTime: '18:45',
          locationId: mockLocationId
        }
      ];
      
      // Mock service
      (ramadanService.getScheduleForLocation as jest.Mock).mockResolvedValue(mockSchedule);
      
      // Make request
      const response = await request(app)
        .get(`/api/ramadan/schedule/${mockLocationId}`);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        statusCode: 200,
        data: mockSchedule
      });
      expect(ramadanService.getScheduleForLocation).toHaveBeenCalledWith(mockLocationId);
    });

    it('should return 400 if location ID is invalid', async () => {
      // Mock service to throw error
      const errorMessage = 'Invalid location ID';
      (ramadanService.getScheduleForLocation as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Make request
      const response = await request(app)
        .get('/api/ramadan/schedule/invalid-id');
      
      // Assertions
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: errorMessage
      });
    });
  });

  describe('GET /api/ramadan/day/:id', () => {
    it('should return a specific day for a valid ID', async () => {
      // Mock data
      const mockDayId = 'day-1';
      const mockDay = {
        id: mockDayId,
        date: '2025-03-01',
        dayOfRamadan: 1,
        sahurStart: '04:00',
        sahurEnd: '05:30',
        fajrTime: '05:30',
        iftarTime: '18:45',
        maghribTime: '18:45',
        locationId: 'location-1'
      };
      
      // Mock service
      (ramadanService.getDayById as jest.Mock).mockResolvedValue(mockDay);
      
      // Make request
      const response = await request(app)
        .get(`/api/ramadan/day/${mockDayId}`);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        statusCode: 200,
        data: mockDay
      });
      expect(ramadanService.getDayById).toHaveBeenCalledWith(mockDayId);
    });

    it('should return 404 if day is not found', async () => {
      // Mock service to return null
      (ramadanService.getDayById as jest.Mock).mockResolvedValue(undefined);
      
      // Make request
      const response = await request(app)
        .get('/api/ramadan/day/non-existent-id');
      
      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Ramadan day not found'
      });
    });
  });

  describe('POST /api/ramadan/calculate/:locationId', () => {
    it('should calculate and return schedule for a valid location', async () => {
      // Mock data
      const mockLocationId = 'location-1';
      const mockSchedule = [
        {
          id: 'day-1',
          date: '2025-03-01',
          dayOfRamadan: 1,
          sahurStart: '04:00',
          sahurEnd: '05:30',
          fajrTime: '05:30',
          iftarTime: '18:45',
          maghribTime: '18:45',
          locationId: mockLocationId
        }
      ];
      
      // Mock services
      (locationService.getLocationById as jest.Mock).mockResolvedValue({
        id: mockLocationId,
        city: 'Mecca',
        country: 'Saudi Arabia',
        latitude: 21.4225,
        longitude: 39.8262,
        timezone: 'Asia/Riyadh'
      });
      (ramadanService.calculateSchedule as jest.Mock).mockResolvedValue(mockSchedule);
      
      // Make request
      const response = await request(app)
        .post(`/api/ramadan/calculate/${mockLocationId}`);
      
      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        statusCode: 201,
        data: mockSchedule,
        message: 'Ramadan schedule calculated successfully'
      });
      expect(ramadanService.calculateSchedule).toHaveBeenCalledWith(mockLocationId);
    });

    it('should return 400 if location is invalid', async () => {
      // Mock service to throw error
      const errorMessage = 'Location not found';
      (ramadanService.calculateSchedule as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Make request
      const response = await request(app)
        .post('/api/ramadan/calculate/invalid-id');
      
      // Assertions
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: errorMessage
      });
    });
  });
  
  // Test 404 handler for non-existent routes
  describe('404 handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/non-existent-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Resource not found'
      });
    });
  });
});