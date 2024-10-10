import { Schema, model, Document } from 'mongoose';

export interface RoomDocument extends Document {
  roomType: string;
  price: number;
  _id: string | Schema.Types.ObjectId; // Explicitly define _id type
}

const RoomSchema = new Schema<RoomDocument>({
  roomType: { type: String, required: true },
  price: { type: Number, required: true }
});

export const Room = model<RoomDocument>('Room', RoomSchema);
