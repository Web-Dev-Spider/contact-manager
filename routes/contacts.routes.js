const contactRoute = require("express").Router();
const validateToken = require("../middlewares/validateTokenHandler");

const {
  getContacts,
  createContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contact.controller");

contactRoute.use(validateToken);
contactRoute.get("/", getContacts);
contactRoute.post("/", createContacts);
contactRoute.get("/:id", validateToken, getContactById);
contactRoute.put("/:id", updateContactById);
contactRoute.delete("/:id", deleteContactById);

module.exports = contactRoute;
