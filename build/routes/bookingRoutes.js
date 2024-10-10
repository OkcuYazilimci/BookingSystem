"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controllers/booking.controller");
const jwtAuthMiddleware_1 = require("../middleware/jwtAuthMiddleware");
const router = express_1.default.Router();
router.post('/', jwtAuthMiddleware_1.jwtAuth, booking_controller_1.createBooking);
router.get('/:id', jwtAuthMiddleware_1.jwtAuth, booking_controller_1.getBookingById);
router.get('/', jwtAuthMiddleware_1.jwtAuth, booking_controller_1.getAllBookings);
router.put('/:id', jwtAuthMiddleware_1.jwtAuth, booking_controller_1.updateBooking);
router.delete('/:id', jwtAuthMiddleware_1.jwtAuth, booking_controller_1.deleteBooking);
exports.default = router;
