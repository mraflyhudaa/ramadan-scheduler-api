import { Location } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock database
const locations: Location[] = [
  {
    id: '1',
    city: 'Mecca',
    country: 'Saudi Arabia',
    latitude: 21.4225,
    longitude: 39.8262,
    timezone: 'Asia/Riyadh'
  },
  {
    id: '2',
    city: 'Jakarta',
    country: 'Indonesia',
    latitude: -6.2088,
    longitude: 106.8456,
    timezone: 'Asia/Jakarta'
  }
];

export const getLocations = async (): Promise<Location[]> => {
  return locations;
};

export const getLocationById = async (id: string): Promise<Location | undefined> => {
  return locations.find(location => location.id === id);
};

export const createLocation = async (locationData: Omit<Location, 'id'>): Promise<Location> => {
  const newLocation: Location = {
    id: uuidv4(),
    ...locationData
  };
  
  locations.push(newLocation);
  return newLocation;
};

export const updateLocation = async (id: string, locationData: Partial<Omit<Location, 'id'>>): Promise<Location | undefined> => {
  const index = locations.findIndex(location => location.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  locations[index] = {
    ...locations[index],
    ...locationData
  };
  
  return locations[index];
};