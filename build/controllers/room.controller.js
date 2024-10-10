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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const roomService_1 = require("../services/roomService");
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
class RoomController {
    listRooms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield roomService_1.roomService.listRooms();
                res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(rooms);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getRoomById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield roomService_1.roomService.getRoomById(req.params.id);
                res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(room);
            }
            catch (err) {
                next(err);
            }
        });
    }
    createRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, price, available } = req.body;
            try {
                const room = yield roomService_1.roomService.createRoom(type, price, available);
                res.status(httpStatusCodes_1.HTTP_STATUS.CREATED).json(room);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield roomService_1.roomService.updateRoom(req.params.id, req.body);
                res.status(httpStatusCodes_1.HTTP_STATUS.OK).json(room);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield roomService_1.roomService.deleteRoom(req.params.id);
                res.status(httpStatusCodes_1.HTTP_STATUS.NO_CONTENT).send();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.roomController = new RoomController();
