const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: String,
    required: [true, "Date is required"],
    unique: [true, "Already have an entry for this date"]
  },
  entries: [
    {
      startHour: { type: String },
      endHour: { type: String },
      attendees: { type: String },
      _id: false
    }
  ]
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
