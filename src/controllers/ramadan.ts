import { Request, Response } from 'express';
import { RamadanDay, SuccessResponse, ErrorResponse } from '../types';
import * as ramadanService from '../services/ramadan';

export const getRamadanSchedule = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.locationId;
    const schedule = await ramadanService.getScheduleForLocation(locationId);
    
    const response: SuccessResponse<RamadanDay[]> = {
      statusCode: 200,
      data: schedule
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get Ramadan schedule'
    };
    res.status(400).json(errorResponse);
  }
};

export const getRamadanDayById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const day = await ramadanService.getDayById(id);
    
    if (!day) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'Ramadan day not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<RamadanDay> = {
      statusCode: 200,
      data: day
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get Ramadan day'
    };
    res.status(400).json(errorResponse);
  }
};

export const calculateScheduleForLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.locationId;
    const schedule = await ramadanService.calculateSchedule(locationId);
    
    const response: SuccessResponse<RamadanDay[]> = {
      statusCode: 201,
      data: schedule,
      message: 'Ramadan schedule calculated successfully'
    };
    
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to calculate Ramadan schedule'
    };
    res.status(400).json(errorResponse);
  }
};