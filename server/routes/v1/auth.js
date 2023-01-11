import express from "express";

import { password, registration, sessions } from "../../controllers/auth";
import protect from "../../middlewares/auth";

const { forgotPassword, resetPassword, updatePassword } = password;
const { register, updateDetails } = registration;
const { getMe, login, logout } = sessions;

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/update-details", protect, updateDetails);
router.put("/update-password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

export default router;
