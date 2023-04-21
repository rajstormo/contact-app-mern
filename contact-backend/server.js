
// to use the variables defined inside .env file
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const connectDB = require("./config/dbConnection");

const login = require("./routes/login");
const register = require("./routes/register");
const contact = require("./routes/contact");
const verifyJWT = require("./middleware/verifyJWT");

app.use(cors());
app.use(express.json());

// connect to database
connectDB();

//login  
app.use("/api", register)
app.use("/api", login);

// check login status of the user
app.get("/api/login-status",verifyJWT, (req,res) => {
  return res.status(200).json({...req.user._doc});
});

// for all subsequent request the middleware verifyJWT will be used
app.use(verifyJWT);
app.use("/api",contact);

// if connect to DB, run the server
mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(port, () => console.log(`listening on port ${port}`));
})

