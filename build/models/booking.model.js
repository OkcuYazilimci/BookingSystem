"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
