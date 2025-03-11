import { Request, Response } from 'express';
import { getRamadanSchedule, getRamadanDayById, calculateScheduleForLocation } from '../../controllers/ramadan';
import * as ramadanService from '../../services/ramadan';
import { RamadanDay } from '../../types';

// Mock the ramadan service
jest.mock('../../services/ramadan');

describe('Ramadan Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any = {};

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup request/response mocks
    mockRequest = {};
    responseObject = {
      statusCode: 0,
      data: null,
      message: ''
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(data => {
        responseObject = data;
        return mockResponse;
      })
    };
  });

  describe('getRamadanSchedule', () => {
    it('should return a schedule for a valid location ID', async () => {
      // Setup mock data
      const mockLocationId = 'location-1';
      const mockSchedule: RamadanDay[] = [
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
      
      // Setup request
      mockRequest.params = { locationId: mockLocationId };
      
      // Mock service call
      (ramadanService.getScheduleForLocation as jest.Mock).mockResolvedValue(mockSchedule);
      
      // Call controller
      await getRamadanSchedule(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(ramadanService.getScheduleForLocation).toHaveBeenCalledWith(mockLocationId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 200,
        data: mockSchedule
      });
    });

    it('should return error response if service throws', async () => {
      // Setup request
      mockRequest.params = { locationId: 'location-1' };
      
      // Mock service to throw error
      const errorMessage = 'Error fetching schedule';
      (ramadanService.getScheduleForLocation as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Call controller
      await getRamadanSchedule(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 400,
        message: errorMessage
      });
    });
  });

  describe('getRamadanDayById', () => {
    it('should return a specific day for a valid ID', async () => {
      // Setup mock data
      const mockDayId = 'day-1';
      const mockDay: RamadanDay = {
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
      
      // Setup request
      mockRequest.params = { id: mockDayId };
      
      // Mock service call
      (ramadanService.getDayById as jest.Mock).mockResolvedValue(mockDay);
      
      // Call controller
      await getRamadanDayById(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(ramadanService.getDayById).toHaveBeenCalledWith(mockDayId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 200,
        data: mockDay
      });
    });

    it('should return 404 if day is not found', async () => {
      // Setup request
      mockRequest.params = { id: 'non-existent-id' };
      
      // Mock service to return null
      (ramadanService.getDayById as jest.Mock).mockResolvedValue(undefined);
      
      // Call controller
      await getRamadanDayById(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 404,
        message: 'Ramadan day not found'
      });
    });

    it('should return error response if service throws', async () => {
      // Setup request
      mockRequest.params = { id: 'day-1' };
      
      // Mock service to throw error
      const errorMessage = 'Error fetching day';
      (ramadanService.getDayById as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Call controller
      await getRamadanDayById(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 400,
        message: errorMessage
      });
    });
  });

  describe('calculateScheduleForLocation', () => {
    it('should calculate and return schedule for a valid location', async () => {
      // Setup mock data
      const mockLocationId = 'location-1';
      const mockSchedule: RamadanDay[] = [
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
      
      // Setup request
      mockRequest.params = { locationId: mockLocationId };
      
      // Mock service call
      (ramadanService.calculateSchedule as jest.Mock).mockResolvedValue(mockSchedule);
      
      // Call controller
      await calculateScheduleForLocation(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(ramadanService.calculateSchedule).toHaveBeenCalledWith(mockLocationId);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 201,
        data: mockSchedule,
        message: 'Ramadan schedule calculated successfully'
      });
    });

    it('should return error response if service throws', async () => {
      // Setup request
      mockRequest.params = { locationId: 'location-1' };
      
      // Mock service to throw error
      const errorMessage = 'Error calculating schedule';
      (ramadanService.calculateSchedule as jest.Mock).mockRejectedValue(new Error(errorMessage));
      
      // Call controller
      await calculateScheduleForLocation(mockRequest as Request, mockResponse as Response);
      
      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(responseObject).toEqual({
        statusCode: 400,
        message: errorMessage
      });
    });
  });
});