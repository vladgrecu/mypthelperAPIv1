const express = require("express");
const router = express.Router();
let Athletes = require("../models/athlete.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name.replace(/\s+/g, "") + "-" + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("Only accepting jpeg/png image files"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//GET ALL ATHLETES
router.get("/", (req, res) => {
  Athletes.find()

    .then(athletes => res.json(athletes))
    .catch(err => res.status(400).json("Error: " + err));
});

//ADD NEW ATHLETE
router.post("/", upload.single("photo"), (req, res) => {
  const host = req.get("Host");
  const { name, age, sex, email, personalBest } = req.body;
  const photo = req.file;
  const newAthlete = new Athletes({
    name,
    age,
    sex,
    email,
    personalBest,
    photo: host + "/photos/" + photo.filename
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
    .then(athlete => {
      res.send(athlete);
    })
    .catch(err => {
      console.log(res.status);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
