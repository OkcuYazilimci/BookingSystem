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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("../services/authService");
const httpStatusCodes_1 = require("../utils/constants/httpStatusCodes");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const { token, user } = yield authService_1.authService.registerUser(firstName, lastName, email, password, role);
        res.status(httpStatusCodes_1.HTTP_STATUS.CREATED)
            .header('Authorization', `Bearer ${token}`)
            .json({ message: 'User registered successfully', user });
    }
    catch (err) {
        next(err);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, user } = yield authService_1.authService.loginUser(email, password);
        res.status(httpStatusCodes_1.HTTP_STATUS.OK)
            .header('Authorization', `Bearer ${token}`)
            .json({ message: 'Logged in successfully', user });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
