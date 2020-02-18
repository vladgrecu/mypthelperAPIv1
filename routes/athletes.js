const express = require("express");
const router = express.Router();

const athletesController = require("../controllers/athletesController");

const authorization = require("../helpers/authorization");
const { profileImage } = require("../helpers/uploadToS3");

//GET ALL ATHLETES
router.get("/", authorization, athletesController.all);

//ADD NEW ATHLETE
router.post(
  "/",
  authorization,
  profileImage.single("photo"),
  athletesController.new
);

//GET SPECIFIC ATHLETE BY ID
router.get("/:id", authorization, athletesController.getOne);

//DELETE ATHLETE
router.delete("/:id", authorization, athletesController.delete);

//EDIT ATHLETE
router.put("/:id", authorization, athletesController.edit);

//POST NEW WOD FOR ATHLETE
router.post("/:id", authorization, athletesController.addWod);

//FIND SPECIFIC ATHLETE BY NAME
router.get("/find/:query", authorization, athletesController.search);

module.exports = router;
