export {};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2
  },
  abbreviation: {
    type: String,
    required: true
  }
});

const Location = mongoose.model("Location", locationSchema);

module.exports = { Location };
