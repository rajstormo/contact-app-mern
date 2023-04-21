
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  email : {
    type: String,
    required: true, 
  }, 
  name: {
    type:String,
    required: true,
  },
  contactNo: {
    type:String,
    required: true,
  },
  profilePic: {
    type:String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("contact",ContactSchema);
