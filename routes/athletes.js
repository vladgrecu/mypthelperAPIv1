const express = require("express");
const router = express.Router();

const athletesController = require("../controllers/athletesController");

const authorization = require("../helpers/authorization");
const { profileImage } = require("../helpers/uploadToS3");

//GET ALL ATHLETES
router.get("/:coachId", authorization, athletesController.all);

//ADD NEW ATHLETE
router.post(
  "/:coachId",
  authorization,
  profileImage.single("photo"),
  athletesController.new
);

//GET SPECIFIC ATHLETE BY ID
router.get("/:coachId/:id", authorization, athletesController.getOne);

//DELETE ATHLETE
router.delete("/:coachId/:id", authorization, athletesController.delete);

//EDIT ATHLETE
router.put("/:coachId/:id", authorization, athletesController.edit);

//POST NEW WOD FOR ATHLETE
router.post("/:coachId/:id", authorization, athletesController.addWod);

//FIND SPECIFIC ATHLETE BY NAME
router.get("/:coachId/find/:query", authorization, athletesController.search);

module.exports = router;
