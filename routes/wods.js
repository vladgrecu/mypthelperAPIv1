const express = require("express");
const router = express.Router();
let Wods = require("../models/wods.model");

router.get("/", (req, res) => {
  Wods.find()
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const exercises = req.body.exercises;
  const newWod = new Wods({ name, exercises });
  newWod
    .save()
    .then(() => res.json("Wod added to Database:" + newWod))
    .catch(err => res.status(400).json("Wod already exists"));
});

router.get("/:id", (req, res) => {
  Wod.findById(req.params.id)
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Wods.findByIdAndDelete(req.params.id)
    .then(wod => res.json(`Wod ${wod.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
  Wods.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(wod => {
      res.send(wod);
    })
    .catch(err => {
      console.log(res.status);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
