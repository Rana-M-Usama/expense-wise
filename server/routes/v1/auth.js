const express = require("express");
const {
  passwords,
  registrations,
  sessions,
} = require("../../controllers/auth");

const { forgotPassword, resetPassword, updatePassword } = passwords;
const { register, updateDetails } = registrations;
const { getMe, login, logout } = sessions;

const router = express.Router();

const { protect } = require("../../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/updateDetails", protect, updateDetails);
router.put("/updatePassword", protect, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);

module.exports = router;
