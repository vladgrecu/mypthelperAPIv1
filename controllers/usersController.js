const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const hashPassword = async password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const isFoundInDb = await Users.findOne({ email });

    if (isFoundInDb) {
      throw new Error("User already exists!");
    }
    // hash the password
    const hashedPassword = await hashPassword(password);

    const newUser = new Users({
      firstName,
      lastName,
      password: hashedPassword,
      email
    });
    const savedUser = await newUser.save();

    const jwtDetails = { id: savedUser._id, name: savedUser.firstName };

    // generate accessToken
    const accessToken = jwt.sign(jwtDetails, process.env.ACCESS_TOKEN_SECRET);

    res.status(201).json({
      accessToken,
      success: `New Coach registered: ${firstName} ${lastName}`,
      id: savedUser._id
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isFoundInDb = await Users.findOne({ email });

    if (!isFoundInDb) {
      throw new Error("User does not exist");
    }
    // check password
    const passwordMatch = await bcrypt.compare(password, isFoundInDb.password);
    console.log("isFound : ", passwordMatch);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    // generate token
    const jwtDetails = { id: isFoundInDb._id, name: isFoundInDb.firstName };
    const accessToken = jwt.sign(jwtDetails, process.env.ACCESS_TOKEN_SECRET);

    // send response

    res.status(200).json({ accessToken, id: isFoundInDb._id });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: `User ${user.firstName} removed from DB` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
