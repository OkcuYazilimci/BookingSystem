import express from 'express';
import { roomController } from '../controllers/room.controller';
import { jwtAuth } from '../middleware/jwtAuthMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

// customer and admin
router.get('/', roomController.listRooms);
router.get('/:id', roomController.getRoomById);

// only admin
router.post('/', jwtAuth, authorizeRoles('admin'), roomController.createRoom);
router.put('/:id', jwtAuth, authorizeRoles('admin'), roomController.updateRoom);
router.delete('/:id', jwtAuth, authorizeRoles('admin'), roomController.deleteRoom);

export default router;
