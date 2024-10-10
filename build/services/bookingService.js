"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const booking_model_1 = require("../models/booking.model");
const room_model_1 = require("../models/room.model");
const AppError_1 = __importDefault(require("../utils/AppError"));
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const utils_1 = require("../utils/utils");
class BookingService {
    createBooking(bookingData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.Room.findById(bookingData.roomId);
            if (!room) {
                throw new AppError_1.default('Room not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            const isAvailable = yield this.checkRoomAvailability(bookingData.roomId, bookingData.checkInDate, bookingData.checkOutDate);
            if (!isAvailable) {
                throw new AppError_1.default('Room is not available for the selected dates', httpStatusCodes_1.HTTP_STATUS.CONFLICT);
            }
            const numberOfDays = (0, utils_1.calculateNumberOfDays)(bookingData.checkInDate, bookingData.checkOutDate);
            const totalPrice = (0, utils_1.calculateTotalPrice)(room.price, numberOfDays);
            const newBooking = new booking_model_1.Booking({
                userId,
                roomId: bookingData.roomId,
                checkInDate: bookingData.checkInDate,
                checkOutDate: bookingData.checkOutDate,
                guests: bookingData.guests,
                paymentMethod: bookingData.paymentMethod,
                totalPrice,
            });
            yield newBooking.save();
            return newBooking;
        });
    }
    checkRoomAvailability(roomId, checkInDate, checkOutDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingBookings = yield booking_model_1.Booking.find({
                roomId: roomId,
                $or: [
                    {
                        checkInDate: { $lt: checkOutDate },
                        checkOutDate: { $gt: checkInDate }
                    }
                ]
            });
            return existingBookings.length === 0;
        });
    }
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.Booking.findById(bookingId).populate('userId').populate('roomId');
            if (!booking) {
                throw new AppError_1.default('Booking not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return booking;
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield booking_model_1.Booking.find().populate('userId').populate('roomId');
        });
    }
    updateBooking(bookingId, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, bookingData, { new: true });
            if (!updatedBooking) {
                throw new AppError_1.default('Booking not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return updatedBooking;
        });
    }
    deleteBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBooking = yield booking_model_1.Booking.findByIdAndDelete(bookingId);
            if (!deletedBooking) {
                throw new AppError_1.default('Booking not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return deletedBooking;
        });
    }
}
exports.bookingService = new BookingService();
