
const User = require("../models/User");
const bcrypt = require("bcrypt");

const validate = (email,username,password) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex))
    return "Please enter a valid email address";
  
  if (username.length < 3)
    return "username must be atleast 3 characters long";
  
  if (password.length < 6)
    return "password must be atleast 6 characters long";
  
}

const handleNewUser = async (req, res) => {
  const {email, username, password} = req.body;
  if (!email || !username || !password)
    return res.status(400).json({error: "All fields are required"});

  // validate the inputs(email, username, password)
  const hasError = validate(email,username,password);
  if (hasError)
    return res.status(400).json({error: hasError});

  // only add user with unique email and username 
  const userExists = await User.findOne({username: username});
  const emailExists = await User.findOne({email: email});
  if (userExists || emailExists)
    return res.status(409).json({error: "user or email already exists"});
  
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({email, username, password: encryptedPassword});
    
    //save the new user in db
    const result = await newUser.save();
    // return res.status(201).json({result});
    res.status(201).json({success:`User ${username} successfully created`});
  }
  catch(err) {
    res.json({error:err});
  }

}

module.exports = {handleNewUser};