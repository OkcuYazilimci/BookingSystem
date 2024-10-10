"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = exports.calculateNumberOfDays = void 0;
const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfDays = timeDifference / (1000 * 60 * 60 * 24); // Milliseconds -> days
    if (numberOfDays <= 0) {
        throw new Error('Check-out date must be later than check-in date');
    }
    return numberOfDays;
};
exports.calculateNumberOfDays = calculateNumberOfDays;
const calculateTotalPrice = (roomPrice, numberOfDays) => {
    return roomPrice * numberOfDays;
};
exports.calculateTotalPrice = calculateTotalPrice;
