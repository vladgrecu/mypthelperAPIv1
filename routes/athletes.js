const express = require("express");
const router = express.Router();
let Athletes = require("../models/athlete.model");
const { profileImage } = require("../helpers/uploadToS3");

//GET ALL ATHLETES
router.get("/", (req, res) => {
  Athletes.find()

    .then(athletes => res.json(athletes))
    .catch(err => res.status(400).json("Error: " + err));
});

//ADD NEW ATHLETE
router.post("/", profileImage.single("photo"), (req, res) => {
  const host = req.get("Host");
  const { name, age, sex, email, phoneNumber, birthday } = req.body;
  let photo;
  let personalBest = req.body.personalBest;
  personalBest = JSON.parse(personalBest);
  req.file
    ? (photo =
        "https://mypthelperbucket.s3.us-east-2.amazonaws.com/" +
        req.file.originalname)
    : sex === "M"
    ? (photo = "https://" + host + "/photos/NoPhotoMale.jpg")
    : (photo = "https://" + host + "/photos/NoPhotoFemale.jpg");
  const newAthlete = new Athletes({
    name,
    age,
    birthday,
    sex,
    email,
    phoneNumber,
    personalBest,
    photo: photo
  });
  newAthlete
    .save()
    .then(() => res.json("Athlete added: " + newAthlete))
    .catch(err => res.status(422).json(`${err}`));
});

//GET SPECIFIC ATHLETE BY ID
router.get("/:id", (req, res) => {
  Athletes.findById(req.params.id)
    .then(athlete => res.json(athlete))
    .catch(err => res.status(400).json("Error: " + err));
});

//DELETE ATHLETE
router.delete("/:id", (req, res) => {
  Athletes.findByIdAndDelete(req.params.id)
    .then(athlete => res.json(`Athlete ${athlete.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
});

//EDIT ATHLETE
router.put("/:id", (req, res) => {
  Athletes.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(athlete => res.json(`Athlete ${athlete.name} updated succesfully!`))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST NEW WOD FOR ATHLETE
router.post("/:id", (req, res) => {
  Athletes.findById(req.params.id)
    .then(athlete => {
      athlete.wods.push(req.body);
      athlete.save();
      return res.json(`${athlete.name} has done the ${req.body.name} Workout!`);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
//FIND SPECIFIC ATHLETE BY NAME
router.get("/find/:query", (req, res) => {
  const query = req.params.query;
  Athletes.find(
    {
      name: {
        $regex: query,
        $options: "i"
      }
    },
    (err, result) => {
      if (err) throw "No Athlete with this name found!";
      if (result.length) {
        res.send(result);
      } else {
        res.send(JSON.stringify({ error: "No Athlete with this name found!" }));
      }
    }
  );
});

module.exports = router;
