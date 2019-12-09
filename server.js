const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.port || 3000;

const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully.");
});

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
const athletesRoute = require("./routes/athletes");
const wodsRoute = require("./routes/wods");

app.use("/athletes", athletesRoute);
app.use("/wods", wodsRoute);

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
