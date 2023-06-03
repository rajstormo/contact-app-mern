const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/create-contact", contactController.createNewContact);
router.get("/getContacts", contactController.getAllContacts);
router.delete("/delete-contact/:id", contactController.deleteContact);
router.put("/update-contact/:id", contactController.updateContact);


module.exports = router;
