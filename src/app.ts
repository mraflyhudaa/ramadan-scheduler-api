import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import ramadanRoutes from './routes/ramadan';
import userRoutes from './routes/user';
import reminderRoutes from './routes/reminder';
import locationRoutes from './routes/location';
import {ErrorResponse} from "./types/index"

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(json());

// Routes
app.use('/api/ramadan', ramadanRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/locations', locationRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    statusCode: 404,
    message: 'Resource not found'
  };
  res.status(404).json(errorResponse);
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const errorResponse: ErrorResponse = {
    statusCode: 500,
    message: 'Internal Server Error'
  };
  res.status(500).json(errorResponse);
});

export default app;