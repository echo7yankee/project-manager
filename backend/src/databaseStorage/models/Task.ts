import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

export const taskSchema = new Schema({
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
    completed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
    },
    schedule: {
        type: Number,
    }
});

// tslint:disable-next-line: variable-name
export const Task: string = mongoose.model('Task', taskSchema);
