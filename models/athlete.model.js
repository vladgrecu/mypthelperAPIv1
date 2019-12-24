const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const athleteSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"]
  },
  sex: {
    type: String,
    required: [true, "Genre is required"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: true
  },
  email: {
    type: String,
    required: [
      true,
      "Email is required and needs to be unique in the database"
    ],
    unique: true
  },
  personalBest: {
    benchpress: { type: Number, default: 0 },
    strictpress: { type: Number, default: 0 },
    pushpress: { type: Number, default: 0 },
    row: { type: Number, default: 0 },
    backsquat: { type: Number, default: 0 },
    frontsquat: { type: Number, default: 0 },
    deadlift: { type: Number, default: 0 },
    trapDeadlift: { type: Number, default: 0 }
  },
  photo: {
    type: String
  }
});
const Athlete = mongoose.model("Athlete", athleteSchema);

module.exports = Athlete;
