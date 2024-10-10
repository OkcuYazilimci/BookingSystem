import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError'; // Import your AppError utility

export const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Internal server error';
  
  console.error('ERROR: ', err);

  res.status(statusCode).json({
    status: err instanceof AppError ? err.status : 'error',
    message,
  });
};
