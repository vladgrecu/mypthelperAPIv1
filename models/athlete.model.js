const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    sparse: true
  },
  time: { type: Number, default: 0 },
  reps: { type: Number, default: 0 },
  date: { type: String }
});

const athleteSchema = new Schema({
  coach: { type: Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true
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
  birthday: { type: String, default: "1988-03-22" },
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
  },
  wods: [wodSchema]
});
const Athlete = mongoose.model("Athlete", athleteSchema);

module.exports = Athlete;
