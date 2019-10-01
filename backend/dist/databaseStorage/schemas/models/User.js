const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    role: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
//# sourceMappingURL=User.js.map