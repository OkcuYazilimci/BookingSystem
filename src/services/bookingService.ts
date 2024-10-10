import { Booking } from '../models/booking.model';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

class BookingService {
  public async createBooking(bookingData: any) {
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    return newBooking;
  }

  public async getBookingById(bookingId: string) {
    const booking = await Booking.findById(bookingId).populate('userId').populate('roomId');
    if (!booking) {
      throw new AppError('Booking not found', HTTP_STATUS.NOT_FOUND);
    }
    return booking;
  }

  public async getAllBookings() {
    return await Booking.find().populate('userId').populate('roomId');
  }

  public async updateBooking(bookingId: string, bookingData: any) {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, bookingData, { new: true });
    if (!updatedBooking) {
      throw new AppError('Booking not found', HTTP_STATUS.NOT_FOUND);
    }
    return updatedBooking;
  }

  public async deleteBooking(bookingId: string) {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      throw new AppError('Booking not found', HTTP_STATUS.NOT_FOUND);
    }
    return deletedBooking;
  }
}

export const bookingService = new BookingService();
