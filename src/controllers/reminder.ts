import { Request, Response } from 'express';
import { Reminder, SuccessResponse, ErrorResponse } from '../types';
import * as reminderService from '../services/reminder';

export const createReminder = async (req: Request, res: Response) => {
  try {
    const reminderData: Omit<Reminder, 'id'> = req.body;
    const reminder = await reminderService.createReminder(reminderData);
    
    const response: SuccessResponse<Reminder> = {
      statusCode: 201,
      data: reminder,
      message: 'Reminder created successfully'
    };
    
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to create reminder'
    };
    res.status(400).json(errorResponse);
  }
};

export const getUserReminders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const reminders = await reminderService.getRemindersByUserId(userId);
    
    const response: SuccessResponse<Reminder[]> = {
      statusCode: 200,
      data: reminders
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to get user reminders'
    };
    res.status(400).json(errorResponse);
  }
};

export const updateReminder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const reminderData: Partial<Omit<Reminder, 'id'>> = req.body;
    
    const updatedReminder = await reminderService.updateReminder(id, reminderData);
    
    if (!updatedReminder) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'Reminder not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<Reminder> = {
      statusCode: 200,
      data: updatedReminder,
      message: 'Reminder updated successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to update reminder'
    };
    res.status(400).json(errorResponse);
  }
};

export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const success = await reminderService.deleteReminder(id);
    
    if (!success) {
      const errorResponse: ErrorResponse = {
        statusCode: 404,
        message: 'Reminder not found'
      };
      return res.status(404).json(errorResponse);
    }
    
    const response: SuccessResponse<null> = {
      statusCode: 200,
      data: null,
      message: 'Reminder deleted successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Failed to delete reminder'
    };
    res.status(400).json(errorResponse);
  }
};