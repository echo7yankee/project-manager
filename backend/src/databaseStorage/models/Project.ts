import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    archived:{
        type:Boolean,
        required:true,
    },
    userId: {
        type: String,
        required: true,
    },
});

// tslint:disable-next-line: variable-name
export const Project: string = mongoose.model('Project', projectSchema);
