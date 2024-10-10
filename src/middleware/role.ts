import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access denied. Only admin can access!' });
    }
    next();
  };
};
