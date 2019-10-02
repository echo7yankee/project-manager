import mongoose, { Schema } from 'mongoose';
import { RegisterUser } from '../../TSTypes/User';
const Schema: Schema = mongoose.Schema;

const userSchema: RegisterUser = new Schema({
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

    role: { type: String, required: true },
    date: {
        default: Date.now,
        type: Date,
    },
});

// tslint:disable-next-line: variable-name
export const User: RegisterUser = mongoose.model('User', userSchema);
