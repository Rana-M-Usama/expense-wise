import express from "express";

import auth from "./auth";
import clearTestDB from "./clearTestDB";
import sheets from "./sheets";

const router = express.Router();

router.use("/e2e", clearTestDB);
router.use("/auth", auth);
router.use("/sheets", sheets);

export default router;
