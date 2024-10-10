import { Schema, model, Document } from 'mongoose';
import { IRoom } from './interfaces/room.interface';

export interface RoomDocument extends IRoom, Document {}

const RoomSchema = new Schema<RoomDocument>({
  type: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

export const Room = model<RoomDocument>('Room', RoomSchema);
