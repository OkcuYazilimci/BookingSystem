"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const AppError_1 = __importDefault(require("../utils/AppError"));
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError_1.default('Access denied. Insufficient permissions.', httpStatusCodes_1.HTTP_STATUS.FORBIDDEN));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
