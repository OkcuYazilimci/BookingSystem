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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getAllBookings = exports.getBookingById = exports.createBooking = void 0;
const bookingService_1 = require("../services/bookingService");
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const class_transformer_1 = require("class-transformer");
const createBookingDto_1 = require("../models/dto/createBookingDto");
const class_validator_1 = require("class-validator");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const createBookingDto = (0, class_transformer_1.plainToInstance)(createBookingDto_1.CreateBookingDto, req.body);
        const errors = yield (0, class_validator_1.validate)(createBookingDto);
        if (errors.length > 0) {
            res.status(httpStatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ message: 'Validation failed', errors });
            return;
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }
        const booking = yield bookingService_1.bookingService.createBooking(createBookingDto, userId);
        res.status(httpStatusCodes_1.HTTP_STATUS.CREATED).json(booking);
    }
    catch (error) {
        next(error);
    }
});
exports.createBooking = createBooking;
const getBookingById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookingService_1.bookingService.getBookingById(req.params.id);
        res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(booking);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookingById = getBookingById;
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingService_1.bookingService.getAllBookings();
        res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(bookings);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBookings = getAllBookings;
const updateBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookingService_1.bookingService.updateBooking(req.params.id, req.body);
        res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(booking);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService_1.bookingService.deleteBooking(req.params.id);
        res.status(httpStatusCodes_1.HTTP_STATUS.NO_CONTENT).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBooking = deleteBooking;
