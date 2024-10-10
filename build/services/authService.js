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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const AppError_1 = __importDefault(require("../utils/AppError")); // AppError for consistent error handling
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const passwordService_1 = require("./passwordService");
class AuthService {
    registerUser(firstName_1, lastName_1, email_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (firstName, lastName, email, password, role = 'customer') {
            const existingUser = yield user_model_1.User.findOne({ email });
            if (existingUser) {
                throw new AppError_1.default('User already exists', httpStatusCodes_1.HTTP_STATUS.BAD_REQUEST);
            }
            const hashedPassword = yield passwordService_1.passwordService.hashPassword(password);
            const newUser = new user_model_1.User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return { token, user: newUser };
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email }).select('+password');
            if (!user) {
                throw new AppError_1.default('Invalid credentials', httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
            }
            const isMatch = yield passwordService_1.passwordService.comparePassword(password, user.password);
            if (!isMatch) {
                throw new AppError_1.default('Invalid credentials', httpStatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return { token, user };
        });
    }
}
exports.authService = new AuthService();
