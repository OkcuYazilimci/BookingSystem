"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../utils/AppError")); // Import your AppError utility
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError_1.default ? err.statusCode : 500;
    const message = err instanceof AppError_1.default ? err.message : 'Internal server error';
    console.error('ERROR: ', err);
    res.status(statusCode).json({
        status: err instanceof AppError_1.default ? err.status : 'error',
        message,
    });
};
exports.errorHandler = errorHandler;
