import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock database
const users: User[] = [];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return users.find(user => user.id === id);
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const newUser: User = {
    id: uuidv4(),
    ...userData
  };
  
  users.push(newUser);
  return newUser;
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id'>>): Promise<User | undefined> => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  users[index] = {
    ...users[index],
    ...userData
  };
  
  return users[index];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return false;
  }
  
  users.splice(index, 1);
  return true;
};