const express = require("express");
const router = express.Router();
let Appointments = require("../models/appointment.model");

//GET ALL APPOINTMENTS
router.get("/", (req, res) => {
  Appointments.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(404).json({ error: "Not found" }));
});

//ADD NEW APPOINTMENT
router.post("/", (req, res) => {
  const { date, entries } = req.body;
  entries.map(entry => {
    return (entry = {
      startHour: entry.startHour,
      endHour: entry.endHour,
      attendees: entry.attendees
    });
  });
  const newAppointment = new Appointments({
    date,
    entries
  });
  newAppointment
    .save()
    .then(() => res.status(200).json("New Appointment: " + newAppointment))
    .catch(err => res.status(400).json({ error: "Something went wrong" }));
});

module.exports = router;
