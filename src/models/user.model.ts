import { Schema, model, Document } from 'mongoose';
import { IUser } from './interfaces/user.interface';

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
}, {
  timestamps: true
});

export const User = model<UserDocument>('User', UserSchema);
