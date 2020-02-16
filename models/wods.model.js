const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wodSchema = new Schema({
  coach: { type: Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: { type: String, required: true, default: "N/A" },
  description: { type: String, default: "N/A" },
  time: { type: Number, default: 0 },
  exercises: [
    {
      name: String,
      reps: { type: Number, default: 0 },
      weight: { type: String, default: "/ kg" },
      _id: false
    }
  ]
});

const Wods = mongoose.model("Wod", wodSchema);

module.exports = Wods;
