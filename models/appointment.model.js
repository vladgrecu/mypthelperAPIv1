const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  startHour: String,
  endHour: String,
  attendees: String
});

const appointmentSchema = new Schema({
  coach: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: String,
    required: [true, "Date is required"],
    unique: [true, "Already have an entry for this date"]
  },
  entries: [entrySchema]
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
