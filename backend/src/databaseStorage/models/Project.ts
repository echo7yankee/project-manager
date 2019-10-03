import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

// projects: {
//   [
//     { name: "whatever" },
//     { name: "whatever" },
//     { name: "whatever" },
//   ]
// }


const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    projectTasks: {
        type: Array,
    }
});

// tslint:disable-next-line: variable-name
export const Project: string = mongoose.model('Project', projectSchema);




