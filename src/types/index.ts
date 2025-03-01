export interface Location {
  id: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface RamadanDay {
  id: string;
  date: string;       // ISO format: YYYY-MM-DD
  dayOfRamadan: number;
  sahurStart: string; // 24hr format: HH:MM
  sahurEnd: string;   // 24hr format: HH:MM (same as fajrTime)
  fajrTime: string;   // 24hr format: HH:MM
  iftarTime: string;  // 24hr format: HH:MM (same as maghribTime)
  maghribTime: string; // 24hr format: HH:MM
  locationId: string;
}

export interface Reminder {
  id: string;
  userId: string;
  ramadanDayId: string;
  type: 'SAHUR' | 'IFTAR';
  minutesBefore: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  locationId: string;
  preferredLanguage: string;
  notificationPreference: 'PUSH' | 'EMAIL' | 'SMS' | 'NONE';
}

// Error responses
export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: any;
}

// Success responses
export interface SuccessResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}