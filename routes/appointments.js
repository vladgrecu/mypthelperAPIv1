const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

//GET ALL APPOINTMENTS
router.get("/", appointmentsController.allAppointments);

// GET SPECIFIC APPOINTMENT
router.get("/:query", appointmentsController.byDate);

//ADD NEW APPOINTMENT
router.post("/", appointmentsController.newDate);

// ADD APPOINTMENT WHERE THE ENTRY FOR THAT DATE EXISTS ALREADY
router.post("/:id", appointmentsController.updateDate);

// EDIT ATHLETES FROM A SPECIFIC HOUR
router.put("/:id", appointmentsController.edit);

module.exports = router;
