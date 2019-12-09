const express = require("express");
const router = express.Router();
let Athletes = require("../models/athlete.model");

router.get("/", (req, res) => {
  Athletes.find()
    .then(athletes => res.json(athletes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
  const { name, age, sex, email, personalBest } = req.body;
  const photo = "Add Photo here";
  const newAthlete = new Athletes({
    name,
    age,
    sex,
    email,
    photo,
    personalBest
  });
  newAthlete
    .save()
    .then(() => res.json("Athlete added: " + newAthlete))
    .catch(err => res.status(422).json(`${err}`));
});

router.get("/:id", (req, res) => {
  Athletes.findById(req.params.id)
    .then(athlete => res.json(athlete))
    .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Athletes.findByIdAndDelete(req.params.id)
    .then(athlete => res.json(`Athlete ${athlete.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
  Athletes.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(athlete => {
      res.send(athlete);
    })
    .catch(err => {
      console.log(res.status);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
