import { Request, Response } from 'express';
import { Location, SuccessResponse, ErrorResponse } from '../types';
import * as locationService from '../services/location';

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationService.getLocations();
    
    const response: SuccessResponse<Location[]> = {
      statusCode: 200,
      data: locations
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get locations'
    };
    res.status(400).json(errorResponse);
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const location = await locationService.getLocationById(id);
    
    if (!location) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'Location not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<Location> = {
      statusCode: 200,
      data: location
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get location'
    };
    res.status(400).json(errorResponse);
  }
};

export const createLocation = async (req: Request, res: Response) => {
  try {
    const locationData: Omit<Location, 'id'> = req.body;
    const location = await locationService.createLocation(locationData);
    
    const response: SuccessResponse<Location> = {
      statusCode: 201,
      data: location,
      message: 'Location created successfully'
    };
    
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to create location'
    };
    res.status(400).json(errorResponse);
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const locationData: Partial<Omit<Location, 'id'>> = req.body;
    
    const updatedLocation = await locationService.updateLocation(id, locationData);
    
    if (!updatedLocation) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'Location not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<Location> = {
      statusCode: 200,
      data: updatedLocation,
      message: 'Location updated successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to update location'
    };
    res.status(400).json(errorResponse);
  }
};