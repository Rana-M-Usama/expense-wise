import express from "express";

import clearDB from "../../controllers/clearTestDB";
import isDeveloper from "../../middlewares/clearTestDb";

const router = express.Router();
router.get("/clear-test-db", isDeveloper, clearDB);

export default router;
