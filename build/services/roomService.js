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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const room_model_1 = require("../models/room.model");
const AppError_1 = __importDefault(require("../utils/AppError"));
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
class RoomService {
    listRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield room_model_1.Room.find();
        });
    }
    getRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.Room.findById(id);
            if (!room) {
                throw new AppError_1.default('Room not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return room;
        });
    }
    createRoom(roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = new room_model_1.Room(roomData);
            yield room.save();
            return room;
        });
    }
    updateRoom(id, roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.Room.findByIdAndUpdate(id, roomData, { new: true });
            if (!room) {
                throw new AppError_1.default('Room not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return room;
        });
    }
    deleteRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.Room.findByIdAndDelete(id);
            if (!room) {
                throw new AppError_1.default('Room not found', httpStatusCodes_1.HTTP_STATUS.NOT_FOUND);
            }
            return room;
        });
    }
}
exports.roomService = new RoomService();
