
const Contact = require("../models/Contact");

const createNewContact = async (req, res) => {
  const {email, name, contactNo, profilePic} = req.body;
  if (!email || !name || !contactNo || !profilePic) 
    return res.status(400).json({error: "Please fill all the fields"});
  
  try {
    const newContact = new Contact({email,name,contactNo,profilePic,postedBy:req.user._id});
    const result = await newContact.save();
    return res.status(201).json({...result._doc});
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({error: err});
  }
}

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({contacts: contacts});
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
}

const deleteContact = async (req, res) => {
  // const id = req.params.id;
  const {id} = req.params;
  if (!id)
    return res.status(400).json({error: "id is required"});
  try {
    const isContactDeleted = await Contact.findByIdAndRemove(id);
    if (isContactDeleted)
      return res.status(201).json({success:"contact successfully deleted"});
  }
  catch (err) {
    return res.json({error: err});
  }
}

const updateContact = async (req,res) => {
  const {id} = req.params;
  const {email, name, contactNo, profilePic} = req.body;

  console.log(id);
  console.log(email, name, contactNo, profilePic);

  if (!id)
    return res.status(400).json({error: "id is required"});
  if (!email || !name || !contactNo || !profilePic)
    return res.status(400).json({error: "All fields are required"});
  
  try {
    const updatedContact = await Contact.updateOne({_id:id}, {$set: {email: email, name: name, contactNo: contactNo, profilePic:profilePic} });

    return res.status(200).json({updatedContact});
  }
  catch (err) {
    console.log(err)
  }

}


module.exports = {createNewContact, getAllContacts, deleteContact, updateContact};

