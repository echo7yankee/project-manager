"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    archived: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
    }
});
exports.Task = mongoose_1.default.model('Task', taskSchema);
//# sourceMappingURL=Task.js.map