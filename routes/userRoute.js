const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
