
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const handleUserLogin = async (req,res) => {
  const {userOrEmail, password} = req.body;

  if (!userOrEmail || !password)
    return res.status(400).json({error:"All fields must be filled"});
  
  let userExists;
  if (userOrEmail.includes('@'))
    userExists = await User.findOne({email:userOrEmail});
  else 
    userExists = await User.findOne({username:userOrEmail});
    
  if (!userExists)
    return res.status(401).json({error:"Invalid user or email"});
  
  const decryptedPassword = await bcrypt.compare(password, userExists.password);

  if (decryptedPassword) {
    const payload = {_id:userExists._id};
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});

    const user = {...userExists._doc, password: null};
    res.status(200).json({accessToken, user});
  }
  else 
    return res.status(401).json({error: "wrong password"});
  
}

module.exports = {handleUserLogin};