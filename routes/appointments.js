const express = require("express");
const router = express.Router();
const authorization = require("../helpers/authorization");
const appointmentsController = require("../controllers/appointmentsController");

//GET ALL APPOINTMENTS
router.get("/", authorization, appointmentsController.allAppointments);

// GET SPECIFIC APPOINTMENT
router.get("/:query", authorization, appointmentsController.byDate);

//ADD NEW APPOINTMENT
router.post("/", authorization, appointmentsController.newDate);

// ADD APPOINTMENT WHERE THE ENTRY FOR THAT DATE EXISTS ALREADY
router.post("/:id", authorization, appointmentsController.updateDate);

// EDIT ATHLETES FROM A SPECIFIC HOUR
router.put("/:id", authorization, appointmentsController.edit);

module.exports = router;
