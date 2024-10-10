import { IGuest } from "./guest.interface";

export interface IBooking {
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: IGuest[];
  paymentMethod: string;
  totalPrice: number;
}