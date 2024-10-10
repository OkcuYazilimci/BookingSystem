import { Booking } from '../models/booking.model';
import { Room } from '../models/room.model';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

class RoomService {
  async listRooms() {
    return await Room.find();
  }

  async getRoomById(id: string) {
    const room = await Room.findById(id);
    if (!room) {
      throw new AppError('Room not found', HTTP_STATUS.NOT_FOUND);
    }
    return room;
  }

  async createRoom(type: string, price: number) {
    const roomData: { type: string; price: number} = { type, price };
  
    const room = new Room(roomData);
    await room.save();
    return room;
  }

  public async checkRoomTypeAvailability(roomType: string, checkInDate: string, checkOutDate: string): Promise<string | null> {
    const rooms = await Room.find({ roomType });
    
    for (const room of rooms) {
      const existingBookings = await Booking.countDocuments({
        roomId: room._id,
        $or: [
          { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
        ]
      });

      if (existingBookings === 0) {
        return room._id.toString();
      }
    }
  
    return null;
  }

  async updateRoom(id: string, roomData: any) {
    const room = await Room.findByIdAndUpdate(id, roomData, { new: true });
    if (!room) {
      throw new AppError('Room not found', HTTP_STATUS.NOT_FOUND);
    }
    return room;
  }

  async deleteRoom(id: string) {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      throw new AppError('Room not found', HTTP_STATUS.NOT_FOUND);
    }
    return room;
  }
}

export const roomService = new RoomService();
