const express = require("express");
const router = express.Router();
let Users = require("../models/users.model");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const isFoundInDb = await Users.find({ email: email });
    console.log(isFoundInDb);

    if (isFoundInDb.length) {
      throw "User already exists!";
    }

    const newUser = new Users({ firstName, lastName, password, email });
    await newUser.save();
    res
      .status(200)
      .json({ success: `New Coach registered: ${firstName} ${lastName}` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
