import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password} = req.body;

  try {
    const { token, user } = await authService.registerUser(firstName, lastName, email, password);
    res.status(HTTP_STATUS.CREATED)
       .header('Authorization', `Bearer ${token}`)
       .json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.loginUser(email, password);
    res.status(HTTP_STATUS.OK)
       .header('Authorization', `Bearer ${token}`)
       .json({ message: 'Logged in successfully', user });
  } catch (err) {
    next(err);
  }
};
