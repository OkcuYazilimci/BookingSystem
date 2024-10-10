import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return next(new AppError('No token, authorization denied', HTTP_STATUS.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return next(new AppError('Invalid token', HTTP_STATUS.FORBIDDEN));
  }
};
