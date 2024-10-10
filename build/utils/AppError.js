"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = require("./constants/httpStatusCodes");
class AppError extends Error {
    constructor(message, statusCode = httpStatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
