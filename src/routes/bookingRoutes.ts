import express from 'express';
import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking
} from '../controllers/booking.controller';
import { jwtAuth } from '../middleware/jwtAuthMiddleware';

const router = express.Router();

router.post('/', jwtAuth, createBooking);

router.get('/:id', jwtAuth, getBookingById);

router.get('/', jwtAuth, getAllBookings);

router.put('/:id', jwtAuth, updateBooking);

router.delete('/:id', jwtAuth, deleteBooking);

export default router;
