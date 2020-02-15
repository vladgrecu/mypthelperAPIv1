const express = require("express");
const router = express.Router();
const wodsController = require("../controllers/wodsController");

//GET ALL WODS
router.get("/", wodsController.all);

//POST NEW WOD
router.post("/", wodsController.new);

//GET SPECIFIC WOD BY ID
router.get("/:id", wodsController.one);

//DELETE WOD
router.delete("/:id", wodsController.delete);

//EDIT WOD
router.put("/:id", wodsController.edit);

// SEARCH WOD BY NAME
router.get("/find/:query", wodsController.search);

module.exports = router;
