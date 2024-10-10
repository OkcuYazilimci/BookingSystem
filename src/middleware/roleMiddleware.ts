import { Request, Response, NextFunction, RequestHandler } from 'express';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

export const authorizeRoles = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Access denied. Insufficient permissions.', HTTP_STATUS.FORBIDDEN));
    }
    next();
  };
};
