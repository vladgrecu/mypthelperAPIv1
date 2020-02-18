let Wods = require("../models/wods.model");

// GET ALL
exports.all = async (req, res) => {
  Wods.find({ coach: req.user.id })
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
};

// CREATE NEW
exports.new = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const description = req.body.description;
  const time = req.body.time;
  const exercises = req.body.exercises;
  const newWod = new Wods({
    coach: req.user.id,
    name,
    type,
    description,
    time,
    exercises
  });
  newWod
    .save()
    .then(() => res.json("Wod added to Database:" + newWod))
    .catch(err => res.status(400).json("Wod already exists"));
};

// GET ONE BY ID
exports.one = async (req, res) => {
  Wod.findById(req.params.id)
    .then(wod => res.json(wod))
    .catch(err => res.status(400).json("Error: " + err));
};

// DELETE
exports.delete = async (req, res) => {
  Wods.findByIdAndDelete(req.params.id)
    .then(wod => res.json(`Wod ${wod.name} removed from Database!`))
    .catch(err => res.status(400).json("Error: " + err));
};

// EDIT
exports.edit = async (req, res) => {
  Wods.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(wod => {
      res.send(wod);
    })
    .catch(err => {
      console.log(res.status);
      res.status(400).json("Error: " + err);
    });
};

// GET ALL BY NAME
exports.search = async (req, res) => {
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
};
