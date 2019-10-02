import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const roleSchema: string = new Schema({
    role: {
        type: String,
        required: true,
    },
});

// tslint:disable-next-line: variable-name
export const Role: string = mongoose.model('Role', roleSchema);
