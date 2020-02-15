const express = require("express");
const router = express.Router();
const { profileImage } = require("../helpers/uploadToS3");
const athletesController = require("../controllers/athletesController");

//GET ALL ATHLETES
router.get("/", athletesController.all);

//ADD NEW ATHLETE
router.post("/", profileImage.single("photo"), athletesController.new);

//GET SPECIFIC ATHLETE BY ID
router.get("/:id", athletesController.getOne);

//DELETE ATHLETE
router.delete("/:id", athletesController.delete);

//EDIT ATHLETE
router.put("/:id", athletesController.edit);

//POST NEW WOD FOR ATHLETE
router.post("/:id", athletesController.addWod);

//FIND SPECIFIC ATHLETE BY NAME
router.get("/find/:query", athletesController.search);

module.exports = router;
