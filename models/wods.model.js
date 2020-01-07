const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String, default: "N/A" },
  exercises: [
    {
      name: String,
      nrOfReps: { type: Number, default: 0 },
      weight: { type: Number, default: 0 },
      _id: false
    }
  ]
});

const Wods = mongoose.model("Wod", wodSchema);

module.exports = Wods;
