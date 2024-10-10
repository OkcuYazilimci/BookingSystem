import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import AppError from '../utils/AppError'; // AppError for consistent error handling
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';
import { passwordService } from './passwordService';

class AuthService {
  public async registerUser(firstName: string, lastName: string, email: string, password: string, role = 'customer') {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists', HTTP_STATUS.BAD_REQUEST);
    }

    const hashedPassword = await passwordService.hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return { token, user: newUser };
  }

  public async loginUser(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await passwordService.comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return { token, user };
  }
}

export const authService = new AuthService();
