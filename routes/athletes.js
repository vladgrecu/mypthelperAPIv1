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
  const { name, age, sex, email } = req.body;
  let photo;
  let personalBest = req.body.personalBest;
  personalBest = JSON.parse(personalBest);
  req.file
    ? (photo = req.file.filename)
    : sex === "M"
    ? (photo = "NoPhotoMale.jpg")
    : (photo = "NoPhotoFemale.jpg");
  const newAthlete = new Athletes({
    name,
    age,
    sex,
    email,
    personalBest,
    photo: "https://" + host + "/photos/" + photo
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
