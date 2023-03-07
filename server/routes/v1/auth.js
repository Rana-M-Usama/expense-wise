import express from "express";

import { password, registration, sessions } from "../../controllers/auth";
import multipleFileUpload from "../../middlewares/multiFileUploader";
import protect from "../../middlewares/auth";

const { forgotPassword, resetPassword, updatePassword } = password;
const { confirmEmail, googleRegister, register, updateDetails } = registration;
const { getMe, googleLogin, login, logout } = sessions;

const router = express.Router();

router.post("/google-register", googleRegister);
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/me", [protect, multipleFileUpload("files")], updateDetails);
router.put("/me/password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.put("/confirm-email/:confirmEmailToken", confirmEmail);

export default router;
