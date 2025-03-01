import { Reminder } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getUserById } from './user';
import { getDayById } from './ramadan';

// Mock database
const reminders: Reminder[] = [];

export const getRemindersByUserId = async (userId: string): Promise<Reminder[]> => {
  return reminders.filter(reminder => reminder.userId === userId);
};

export const getReminderById = async (id: string): Promise<Reminder | undefined> => {
  return reminders.find(reminder => reminder.id === id);
};

export const createReminder = async (reminderData: Omit<Reminder, 'id'>): Promise<Reminder> => {
  // Validate that the user exists
  const user = await getUserById(reminderData.userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Validate that the ramadan day exists
  const ramadanDay = await getDayById(reminderData.ramadanDayId);
  if (!ramadanDay) {
    throw new Error('Ramadan day not found');
  }
  
  const newReminder: Reminder = {
    id: uuidv4(),
    ...reminderData
  };
  
  reminders.push(newReminder);
  return newReminder;
};

export const updateReminder = async (id: string, reminderData: Partial<Omit<Reminder, 'id'>>): Promise<Reminder | undefined> => {
  const index = reminders.findIndex(reminder => reminder.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  // If updating userId, validate that the user exists
  if (reminderData.userId) {
    const user = await getUserById(reminderData.userId);
    if (!user) {
      throw new Error('User not found');
    }
  }
  
  // If updating ramadanDayId, validate that the ramadan day exists
  if (reminderData.ramadanDayId) {
    const ramadanDay = await getDayById(reminderData.ramadanDayId);
    if (!ramadanDay) {
      throw new Error('Ramadan day not found');
    }
  }
  
  reminders[index] = {
    ...reminders[index],
    ...reminderData
  };
  
  return reminders[index];
};

export const deleteReminder = async (id: string): Promise<boolean> => {
  const index = reminders.findIndex(reminder => reminder.id === id);
  
  if (index === -1) {
    return false;
  }
  
  reminders.splice(index, 1);
  return true;
};