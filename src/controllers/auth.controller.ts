import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { passwordService } from '../services/passwordService';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('User already exists', HTTP_STATUS.BAD_REQUEST));
    }

    const hashedPassword = await passwordService.hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'customer'
    });

    await user.save();
    res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED));
    }

    const isMatch = await passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED));
    }

    res.status(HTTP_STATUS.OK).json({ message: 'Logged in successfully' });
  } catch (err) {
    next(err);
  }
};
