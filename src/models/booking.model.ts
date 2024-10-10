import { Schema, model, Document } from 'mongoose';
import { IBooking } from './interfaces/booking.interface';

export interface BookingDocument extends IBooking, Document {}

const BookingSchema = new Schema<BookingDocument>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  roomId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Room',
    required: true 
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: [{ 
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, required: true }
  }],
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true
});

export const Booking = model<BookingDocument>('Booking', BookingSchema);
