"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.taskSchema = new Schema({
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
    },
    archived: {
        type: Boolean,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
    },
    schedule: {
        type: Number,
    },
    userId: {
        type: String,
    }
});
exports.Task = mongoose_1.default.model('Task', exports.taskSchema);
//# sourceMappingURL=Task.js.map