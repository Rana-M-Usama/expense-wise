import express from "express";

import auth from "./auth";
import sheets from "./sheets";

const router = express.Router();

router.use("/auth", auth);
router.use("/sheets", sheets);

export default router;
