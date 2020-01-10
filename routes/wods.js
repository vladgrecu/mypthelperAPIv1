const express = require("express");
const router = express.Router();
let Wods = require("../models/wods.model");

//GET ALL WODS
router.get("/", (req, res) => {
  Wods.find()
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST NEW WOD
router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const time = req.body.time;
  const exercises = req.body.exercises;
  const newWod = new Wods({ name, description, time, exercises });
  newWod
    .save()
    .then(() => res.json("Wod added to Database:" + newWod))
    .catch(err => res.status(400).json("Wod already exists"));
});

//GET SPECIFIC WOD BY ID
router.get("/:id", (req, res) => {
  Wod.findById(req.params.id)
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
});

//DELETE WOD
router.delete("/:id", (req, res) => {
  Wods.findByIdAndDelete(req.params.id)
    .then(wod => res.json(`Wod ${wod.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
});

//EDIT WOD
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

router.get("/find/:query", (req, res) => {
  const query = req.params.query;
  Wods.find(
    {
      name: {
        $regex: query,
        $options: "i"
      }
    },
    (err, result) => {
      if (err) throw "No Wod with this name found!";
      if (result.length) {
        res.send(result);
      } else {
        res.send(JSON.stringify({ error: "No Wod with this name found!" }));
      }
    }
  );
});

module.exports = router;
