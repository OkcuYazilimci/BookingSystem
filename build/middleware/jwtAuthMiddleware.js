"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const AppError_1 = __importDefault(require("../utils/AppError"));
const jwtAuth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError_1.default('Authorization header must be in the format: Bearer <token>', httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new AppError_1.default('No token, authorization denied', httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return next(new AppError_1.default('Token is not valid', httpStatusCodes_1.HTTP_STATUS.FORBIDDEN));
    }
};
exports.jwtAuth = jwtAuth;
