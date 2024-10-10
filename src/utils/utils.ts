import { addYears, isAfter, isBefore } from 'date-fns';

export const calculateNumberOfDays = (checkInDate: string, checkOutDate: string): number => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const timeDifference = checkOut.getTime() - checkIn.getTime();
  
  const numberOfDays = timeDifference / (1000 * 60 * 60 * 24); // Milliseconds -> days

  if (numberOfDays <= 0) {
    throw new Error('Check-out date must be later than check-in date');
  }

  return numberOfDays;
};

export const calculateTotalPrice = (roomPrice: number, numberOfDays: number): number => {
  return roomPrice * numberOfDays;
};

export const checkDate = (checkInDate: string) => {
  const today = new Date();
  const oneYearFromNow = addYears(today, 1);
  const checkIn = new Date(checkInDate);

  if (isBefore(checkIn, today)) {
    throw new Error('date cannot be past!');
  }

  if (isAfter(checkIn, oneYearFromNow)) {
    throw new Error('Cannot book a room more than 12 months!');
  }
};