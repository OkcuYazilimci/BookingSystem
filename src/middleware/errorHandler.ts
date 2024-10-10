import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';
import AppError from '../utils/AppError';

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
  });
};
