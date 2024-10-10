"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const jwtAuthMiddleware_1 = require("../middleware/jwtAuthMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// customer and admin
router.get('/', room_controller_1.roomController.listRooms);
router.get('/:id', room_controller_1.roomController.getRoomById);
// only admin
router.post('/', jwtAuthMiddleware_1.jwtAuth, (0, roleMiddleware_1.authorizeRoles)('admin'), room_controller_1.roomController.createRoom);
router.put('/:id', jwtAuthMiddleware_1.jwtAuth, (0, roleMiddleware_1.authorizeRoles)('admin'), room_controller_1.roomController.updateRoom);
router.delete('/:id', jwtAuthMiddleware_1.jwtAuth, (0, roleMiddleware_1.authorizeRoles)('admin'), room_controller_1.roomController.deleteRoom);
exports.default = router;
