"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    daysAllowed: {
        type: Number,
        required: true
    }
});
const Role = mongoose.model("Role", roleSchema);
module.exports = { Role };
//# sourceMappingURL=Role.js.map