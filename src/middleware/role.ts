import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Only admin can access!' });
    }
    next();
  };
};
