import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService'
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';
import AppError from '../utils/AppError';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const { token, user } = await authService.registerUser(firstName, lastName, email, password, role);
    res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully', token, user });
  } catch (err) {
    if (!(err instanceof AppError)) {
      return next(new AppError('Failed to register user', HTTP_STATUS.INTERNAL_SERVER_ERROR));
    }
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.loginUser(email, password);
    res.status(HTTP_STATUS.OK).json({ message: 'Logged in successfully', token, user });
  } catch (err) {
    if (!(err instanceof AppError)) {
      return next(new AppError('Failed to log in', HTTP_STATUS.INTERNAL_SERVER_ERROR));
    }
    next(err);
  }
};
