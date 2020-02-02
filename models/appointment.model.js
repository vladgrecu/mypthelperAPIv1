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
      startHour: String,
      endHour: String,
      attendees: String
    }
  ]
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
