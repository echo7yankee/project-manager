"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const roleSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
});
exports.Role = mongoose_1.default.model('Role', roleSchema);
//# sourceMappingURL=Role.js.map