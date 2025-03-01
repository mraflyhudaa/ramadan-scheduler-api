# Ramadan Prayer Times API

A RESTful API for Ramadan 2025 prayer schedules, providing sahur (pre-dawn meal) and iftar (breaking fast) times based on location.

## Features

- Location-based prayer time calculations using the Adhan library
- User management with notification preferences
- Reminder scheduling for sahur and iftar times
- Timezone-aware calculations
- RESTful API endpoints

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Adhan (Prayer times calculation)
- SQLite (Database)
- Jest (Testing)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd prayer-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   ```

4. Build the project:
   ```
   npm run build
   ```

## Usage

### Development

Run the development server with hot reloading:
```
npm run dev
```

### Production

Build and start the production server:
```
npm run build
npm start
```

### Testing

Run the test suite:
```
npm test
```

## API Endpoints

### Locations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/locations` | Get all locations |
| GET | `/api/locations/:id` | Get location by ID |
| POST | `/api/locations` | Create a new location |
| PUT | `/api/locations/:id` | Update a location |

Location object structure:
```json
{
  "id": "string",
  "name": "string",
  "latitude": number,
  "longitude": number,
  "timezone": "string"
}
```

### Ramadan Schedule

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ramadan/schedule/:locationId` | Get Ramadan schedule for a location |
| GET | `/api/ramadan/day/:id` | Get specific Ramadan day details |
| POST | `/api/ramadan/calculate/:locationId` | Calculate/create Ramadan schedule |

Ramadan day object structure:
```json
{
  "id": "string",
  "date": "string (ISO format)",
  "day": number,
  "locationId": "string",
  "sahurTime": "string (ISO format)",
  "iftarTime": "string (ISO format)"
}
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

User object structure:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "locationId": "string",
  "notificationPreferences": {
    "sahur": boolean,
    "iftar": boolean
  }
}
```

### Reminders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reminders` | Create a new reminder |
| GET | `/api/reminders/user/:userId` | Get user's reminders |
| PUT | `/api/reminders/:id` | Update a reminder |
| DELETE | `/api/reminders/:id` | Delete a reminder |

Reminder object structure:
```json
{
  "id": "string",
  "userId": "string",
  "type": "sahur" | "iftar",
  "time": "string (ISO format)",
  "enabled": boolean,
  "minutesBefore": number
}
```

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "statusCode": number,
  "message": "string"
}
```

Common status codes:
- 200: Success
- 400: Bad Request
- 404: Resource Not Found
- 500: Internal Server Error

## Development

This project is set up with TypeScript, ESLint, and Prettier for development. It uses a simple file-based SQLite database for persistence.

## License

[MIT License](LICENSE)