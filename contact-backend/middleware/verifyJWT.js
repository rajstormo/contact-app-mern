
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.sendStatus(401);
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err)
      return res.status(403).json({error: "Forbidden"});
    
    // except the password field, everything will be contained inside of this userDetail
    const userDetail = await User.findOne({_id: payload._id}).select("-password");
    req.user = userDetail;
    next();
  });
}

module.exports = verifyJWT;