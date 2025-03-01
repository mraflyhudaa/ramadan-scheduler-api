# Ramadan Prayer Times API Documentation

This document provides detailed information about the Ramadan Prayer Times API endpoints, request formats, and response examples.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. This may change in future versions.

## Endpoints

### Locations

#### Get All Locations

```
GET /locations
```

cURL Example:
```bash
curl -X GET http://localhost:3000/api/locations
```

Response:
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "loc-123",
      "name": "Kuala Lumpur",
      "latitude": 3.139,
      "longitude": 101.6869,
      "timezone": "Asia/Kuala_Lumpur"
    },
    {
      "id": "loc-456",
      "name": "Jakarta",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "timezone": "Asia/Jakarta"
    }
  ]
}
```

#### Get Location by ID

```
GET /locations/:id
```

Parameters:
- `id` (path): Location ID

cURL Example:
```bash
curl -X GET http://localhost:3000/api/locations/loc-123
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "loc-123",
    "name": "Kuala Lumpur",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur"
  }
}
```

#### Create Location

```
POST /locations
```

Request Body:
```json
{
  "name": "Kuala Lumpur",
  "latitude": 3.139,
  "longitude": 101.6869,
  "timezone": "Asia/Kuala_Lumpur"
}
```

cURL Example:
```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kuala Lumpur",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur"
  }'
```

Response:
```json
{
  "statusCode": 201,
  "data": {
    "id": "loc-123",
    "name": "Kuala Lumpur",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur"
  }
}
```

#### Update Location

```
PUT /locations/:id
```

Parameters:
- `id` (path): Location ID

Request Body:
```json
{
  "name": "Kuala Lumpur City",
  "latitude": 3.139,
  "longitude": 101.6869,
  "timezone": "Asia/Kuala_Lumpur"
}
```

cURL Example:
```bash
curl -X PUT http://localhost:3000/api/locations/loc-123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kuala Lumpur City",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur"
  }'
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "loc-123",
    "name": "Kuala Lumpur City",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur"
  }
}
```

### Ramadan Schedule

#### Get Ramadan Schedule for Location

```
GET /ramadan/schedule/:locationId
```

Parameters:
- `locationId` (path): Location ID

cURL Example:
```bash
curl -X GET http://localhost:3000/api/ramadan/schedule/loc-123
```

Response:
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "day-1",
      "date": "2025-03-01T00:00:00.000Z",
      "day": 1,
      "locationId": "loc-123",
      "sahurTime": "2025-03-01T05:30:00.000Z",
      "iftarTime": "2025-03-01T19:15:00.000Z"
    },
    {
      "id": "day-2",
      "date": "2025-03-02T00:00:00.000Z",
      "day": 2,
      "locationId": "loc-123",
      "sahurTime": "2025-03-02T05:31:00.000Z",
      "iftarTime": "2025-03-02T19:14:00.000Z"
    }
  ]
}
```

#### Get Specific Ramadan Day

```
GET /ramadan/day/:id
```

Parameters:
- `id` (path): Day ID

cURL Example:
```bash
curl -X GET http://localhost:3000/api/ramadan/day/day-1
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "day-1",
    "date": "2025-03-01T00:00:00.000Z",
    "day": 1,
    "locationId": "loc-123",
    "sahurTime": "2025-03-01T05:30:00.000Z",
    "iftarTime": "2025-03-01T19:15:00.000Z"
  }
}
```

#### Calculate Ramadan Schedule

```
POST /ramadan/calculate/:locationId
```

Parameters:
- `locationId` (path): Location ID

cURL Example:
```bash
curl -X POST http://localhost:3000/api/ramadan/calculate/loc-123
```

Response:
```json
{
  "statusCode": 201,
  "message": "Ramadan schedule calculated successfully",
  "data": {
    "location": "Kuala Lumpur",
    "daysGenerated": 30
  }
}
```

### Users

#### Create User

```
POST /users
```

Request Body:
```json
{
  "name": "Abdullah",
  "email": "abdullah@example.com",
  "locationId": "loc-123",
  "notificationPreferences": {
    "sahur": true,
    "iftar": true
  }
}
```

cURL Example:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Abdullah",
    "email": "abdullah@example.com",
    "locationId": "loc-123",
    "notificationPreferences": {
      "sahur": true,
      "iftar": true
    }
  }'
```

Response:
```json
{
  "statusCode": 201,
  "data": {
    "id": "user-123",
    "name": "Abdullah",
    "email": "abdullah@example.com",
    "locationId": "loc-123",
    "notificationPreferences": {
      "sahur": true,
      "iftar": true
    }
  }
}
```

#### Get User by ID

```
GET /users/:id
```

Parameters:
- `id` (path): User ID

cURL Example:
```bash
curl -X GET http://localhost:3000/api/users/user-123
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "user-123",
    "name": "Abdullah",
    "email": "abdullah@example.com",
    "locationId": "loc-123",
    "notificationPreferences": {
      "sahur": true,
      "iftar": true
    }
  }
}
```

#### Update User

```
PUT /users/:id
```

Parameters:
- `id` (path): User ID

Request Body:
```json
{
  "name": "Abdullah",
  "email": "abdullah.new@example.com",
  "locationId": "loc-456",
  "notificationPreferences": {
    "sahur": false,
    "iftar": true
  }
}
```

cURL Example:
```bash
curl -X PUT http://localhost:3000/api/users/user-123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Abdullah",
    "email": "abdullah.new@example.com",
    "locationId": "loc-456",
    "notificationPreferences": {
      "sahur": false,
      "iftar": true
    }
  }'
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "user-123",
    "name": "Abdullah",
    "email": "abdullah.new@example.com",
    "locationId": "loc-456",
    "notificationPreferences": {
      "sahur": false,
      "iftar": true
    }
  }
}
```

#### Delete User

```
DELETE /users/:id
```

Parameters:
- `id` (path): User ID

cURL Example:
```bash
curl -X DELETE http://localhost:3000/api/users/user-123
```

Response:
```json
{
  "statusCode": 200,
  "message": "User deleted successfully"
}
```

### Reminders

#### Create Reminder

```
POST /reminders
```

Request Body:
```json
{
  "userId": "user-123",
  "type": "sahur",
  "minutesBefore": 30,
  "enabled": true
}
```

cURL Example:
```bash
curl -X POST http://localhost:3000/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "type": "sahur",
    "minutesBefore": 30,
    "enabled": true
  }'
```

Response:
```json
{
  "statusCode": 201,
  "data": {
    "id": "reminder-123",
    "userId": "user-123",
    "type": "sahur",
    "minutesBefore": 30,
    "enabled": true
  }
}
```

#### Get User's Reminders

```
GET /reminders/user/:userId
```

Parameters:
- `userId` (path): User ID

cURL Example:
```bash
curl -X GET http://localhost:3000/api/reminders/user/user-123
```

Response:
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "reminder-123",
      "userId": "user-123",
      "type": "sahur",
      "minutesBefore": 30,
      "enabled": true
    },
    {
      "id": "reminder-456",
      "userId": "user-123",
      "type": "iftar",
      "minutesBefore": 15,
      "enabled": true
    }
  ]
}
```

#### Update Reminder

```
PUT /reminders/:id
```

Parameters:
- `id` (path): Reminder ID

Request Body:
```json
{
  "minutesBefore": 45,
  "enabled": true
}
```

cURL Example:
```bash
curl -X PUT http://localhost:3000/api/reminders/reminder-123 \
  -H "Content-Type: application/json" \
  -d '{
    "minutesBefore": 45,
    "enabled": true
  }'
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "id": "reminder-123",
    "userId": "user-123",
    "type": "sahur",
    "minutesBefore": 45,
    "enabled": true
  }
}
```

#### Delete Reminder

```
DELETE /reminders/:id
```

Parameters:
- `id` (path): Reminder ID

cURL Example:
```bash
curl -X DELETE http://localhost:3000/api/reminders/reminder-123
```

Response:
```json
{
  "statusCode": 200,
  "message": "Reminder deleted successfully"
}
```

## Error Responses

### Resource Not Found (404)

```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### Bad Request (400)

```json
{
  "statusCode": 400,
  "message": "Invalid request body"
}
```

### Internal Server Error (500)

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

## Rate Limiting

Currently, there are no rate limits in place. This may change in future versions.