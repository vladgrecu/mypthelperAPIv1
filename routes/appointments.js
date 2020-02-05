const express = require("express");
const router = express.Router();
let Appointments = require("../models/appointment.model");

//GET ALL APPOINTMENTS
router.get("/", (req, res) => {
  Appointments.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(404).json({ error: "Not found" }));
});
// GET SPECIFIC APPOINTMENT
router.get("/:query", (req, res) => {
  const query = req.params.query;
  Appointments.find({ date: query }, (err, result) => {
    if (err) {
      throw "There was an error";
    }
    if (result.length) {
      res.send(result);
    } else {
      res.send(JSON.stringify({ error: "There is no entry for this date!" }));
    }
  });
});

//ADD NEW APPOINTMENT
router.post("/", (req, res) => {
  const { date, entries } = req.body;
  const newAppointment = new Appointments({
    date,
    entries
  });
  newAppointment
    .save()
    .then(() =>
      res.status(200).json({ success: "New Appointment created for " + date })
    )
    .catch(err =>
      res.status(400).json({ error: "Something went wrong: " + err })
    );
});
// ADD APPOINTMENT WHERE THE ENTRY FOR THAT DATE EXISTS ALREADY
router.post("/:id", (req, res) => {
  Appointments.findById(req.params.id)
    .then(appointment => {
      if (
        appointment.entries.find(
          entry => entry.startHour === req.body.startHour
        )
      ) {
        throw `An entry at ${req.body.startHour} already exists!`;
      }
      appointment.entries.push(req.body);
      appointment.save();
      return res
        .status(200)
        .json({ success: "New Appointment created at " + req.body.startHour });
    })
    .catch(err =>
      res.status(400).json({ error: "Something went wrong: " + err })
    );
});
// EDIT ATHLETES FROM A SPECIFIC HOUR
router.put("/:id", (req, res) => {
  Appointments.findById(req.params.id)
    .then(attendees => {
      const myMap = attendees.entries.map(entry => {
        if (entry._id == req.body.id) {
          return (entry.attendees = req.body.attendees);
        } else {
          return entry;
        }
      });
      attendees.save();
      return res.status(200).json({ success: "Update done!" });
    })
    .catch(err =>
      res.status(400).json({ error: "Something went wrong " + err })
    );
});

module.exports = router;
