"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const jwtAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return next(new AppError_1.default('No token, authorization denied', httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (err) {
        return next(new AppError_1.default('Invalid token', httpStatusCodes_1.HTTP_STATUS.FORBIDDEN));
    }
};
exports.jwtAuth = jwtAuth;
