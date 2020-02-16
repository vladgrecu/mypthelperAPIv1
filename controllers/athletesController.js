const Athletes = require("../models/athlete.model");

// GET ALL
exports.all = async (req, res) => {
  console.log("Params: ", req.params);
  Athletes.find({ coach: req.params.coachId })
    .populate("coach")
    .then(athletes => res.json(athletes))
    .catch(err => res.status(400).json("Error: " + err));
};

// CREATE NEW
exports.new = async (req, res) => {
  const host = req.get("Host");
  const { name, sex, email, phoneNumber, birthday } = req.body;
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
    coach: req.params.coachId,
    name,
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
};

// GET ONE BY ID
exports.getOne = async (req, res) => {
  Athletes.findById(req.params.id)
    .then(athlete => res.json(athlete))
    .catch(err => res.status(400).json("Error: " + err));
};

// DELETE
exports.delete = async (req, res) => {
  Athletes.findByIdAndDelete(req.params.id)
    .then(athlete => res.json(`Athlete ${athlete.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
};

// EDIT
exports.edit = async (req, res) => {
  console.log(req.body);
  Athletes.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(athlete =>
      res.json({
        message: `Athlete ${athlete.name} updated succesfully!`,
        updatedField: req.body
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

// ADD WOD TO ATHLETE
exports.addWod = async (req, res) => {
  Athletes.findById(req.params.id)
    .then(athlete => {
      athlete.wods.push(req.body);
      athlete.save();
      return res.json(`${athlete.name} has done the ${req.body.name} Workout!`);
    })
    .catch(err => res.status(400).json("Error: " + err));
};

// GET ALL BY NAME
exports.search = async (req, res) => {
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
};
