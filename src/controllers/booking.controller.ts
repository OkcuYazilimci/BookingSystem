import { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/bookingService';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(HTTP_STATUS.CREATED).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.status(HTTP_STATUS.OK).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(HTTP_STATUS.OK).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.updateBooking(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json(booking);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    res.status(HTTP_STATUS.NO_CONTENT).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};
