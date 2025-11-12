const express = require("express");
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

const router = express.Router();

// All routes below require authentication
router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
