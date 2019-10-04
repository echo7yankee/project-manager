import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    projectId: {
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

// tslint:disable-next-line: variable-name
export const Task: string = mongoose.model('Task', taskSchema);
