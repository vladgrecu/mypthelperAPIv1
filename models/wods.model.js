const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  exercises: [
    {
      name: String,
      nrOfReps: Number,
      weight: { type: Number, default: 0 },
      _id: false
    }
  ]
});

const Wods = mongoose.model("Wod", wodSchema);

module.exports = Wods;
