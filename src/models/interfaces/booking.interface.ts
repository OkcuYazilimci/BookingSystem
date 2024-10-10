import { Types } from 'mongoose';
import { IGuest } from './guest.interface';

export interface IBooking {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  guests: IGuest[];
  paymentMethod: string;
  totalPrice: number;
}
