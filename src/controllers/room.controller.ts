import { Request, Response, NextFunction } from 'express';
import { roomService } from '../services/roomService';
import AppError from '../utils/AppError';
import { HTTP_STATUS } from '../utils/constants/httpStatusCodes';

class RoomController {
  async listRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await roomService.listRooms();
      res.status(HTTP_STATUS.OK).json(rooms);
    } catch (err) {
      next(err);
    }
  }

  async getRoomById(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await roomService.getRoomById(req.params.id);
      res.status(HTTP_STATUS.OK).json(room);
    } catch (err) {
      next(err);
    }
  }

  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await roomService.createRoom(req.body);
      res.status(HTTP_STATUS.CREATED).json(room);
    } catch (err) {
      next(err);
    }
  }

  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await roomService.updateRoom(req.params.id, req.body);
      res.status(HTTP_STATUS.OK).json(room);
    } catch (err) {
      next(err);
    }
  }

  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await roomService.deleteRoom(req.params.id);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export const roomController = new RoomController();
