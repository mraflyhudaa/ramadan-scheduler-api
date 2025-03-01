import { Request, Response } from 'express';
import { User, SuccessResponse, ErrorResponse } from '../types';
import * as userService from '../services/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: Omit<User, 'id'> = req.body;
    const user = await userService.createUser(userData);
    
    const response: SuccessResponse<User> = {
      statusCode: 201,
      data: user,
      message: 'User created successfully'
    };
    
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to create user'
    };
    res.status(400).json(errorResponse);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    
    if (!user) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'User not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<User> = {
      statusCode: 200,
      data: user
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get user'
    };
    res.status(400).json(errorResponse);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userData: Partial<Omit<User, 'id'>> = req.body;
    
    const updatedUser = await userService.updateUser(id, userData);
    
    if (!updatedUser) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'User not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<User> = {
      statusCode: 200,
      data: updatedUser,
      message: 'User updated successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to update user'
    };
    res.status(400).json(errorResponse);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const success = await userService.deleteUser(id);
    
    if (!success) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'User not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<null> = {
      statusCode: 200,
      data: null,
      message: 'User deleted successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to delete user'
    };
    res.status(400).json(errorResponse);
  }
};