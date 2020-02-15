const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// REGISTER
router.post("/register", userController.register);

// LOGIN
router.post("/login", userController.login);

// DELETE
router.delete("/:id", userController.delete);

module.exports = router;
