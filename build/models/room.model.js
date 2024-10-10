"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, {
    timestamps: true
});
exports.Room = (0, mongoose_1.model)('Room', RoomSchema);
