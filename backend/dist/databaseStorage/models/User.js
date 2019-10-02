"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    confirmPassword: {
        max: 1024,
        min: 6,
        required: true,
        type: String,
    },
    email: {
        max: 255,
        required: true,
        type: String,
    },
    firstName: {
        min: 2,
        required: true,
        type: String,
    },
    lastName: {
        min: 3,
        required: true,
        type: String,
    },
    password: {
        max: 1024,
        min: 6,
        required: true,
        type: String,
    },
    date: {
        default: Date.now,
        type: Date,
    },
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map