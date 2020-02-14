const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  athletes: [{ type: Schema.Types.ObjectId, ref: "Athlete" }],
  wods: [{ type: Schema.Types.ObjectId, ref: "Wod" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
