const express = require("express");
const router = express.Router();
const authorization = require("../helpers/authorization");
const wodsController = require("../controllers/wodsController");

//GET ALL WODS
router.get("/", authorization, wodsController.all);

//POST NEW WOD
router.post("/", authorization, wodsController.new);

//GET SPECIFIC WOD BY ID
router.get("/:id", authorization, wodsController.one);

//DELETE WOD
router.delete("/:id", authorization, wodsController.delete);

//EDIT WOD
router.put("/:id", authorization, wodsController.edit);

// SEARCH WOD BY NAME
router.get("/find/:query", authorization, wodsController.search);

module.exports = router;
