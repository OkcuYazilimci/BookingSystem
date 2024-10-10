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
