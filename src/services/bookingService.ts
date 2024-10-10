import { Booking } from '../models/booking.model';
import { CreateBookingDto } from '../models/dto/createBookingDto';
import { Room } from '../models/room.model';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';
import { calculateNumberOfDays, calculateTotalPrice, checkDate } from '../utils/utils';
import { roomService } from './roomService';

class BookingService {
  public async createBooking(bookingData: CreateBookingDto, userId: string) {
    checkDate(bookingData.checkInDate);
  
    const availableRoomId = await roomService.checkRoomTypeAvailability(bookingData.roomType, bookingData.checkInDate, bookingData.checkOutDate);
  
    if (!availableRoomId) {
      throw new AppError('No available rooms of this type for the selected dates', HTTP_STATUS.CONFLICT);
    }
  
    const room = await Room.findById(availableRoomId);
    if (!room) {
      throw new AppError('Room not found', HTTP_STATUS.NOT_FOUND);
    }
  
    const numberOfDays = calculateNumberOfDays(bookingData.checkInDate, bookingData.checkOutDate);
    const totalPrice = calculateTotalPrice(room.price, numberOfDays);
  
    const newBooking = new Booking({
      userId,
      roomId: availableRoomId,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      guests: bookingData.guests,
      paymentMethod: bookingData.paymentMethod,
      totalPrice,
    });
  
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
