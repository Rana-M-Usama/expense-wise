import express from "express";

import {
  addSheet,
  deleteSheet,
  getSheet,
  getSheets,
  updateSheet,
} from "../../controllers/sheets";
import {
  adminPolicy,
  editPolicy,
  viewPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import ExpenseRouter from "./expenses";
import { permission } from "../../middlewares/permission";
import PermissionRouter from "./permission";
import protect from "../../middlewares/auth";
import Sheet from "../../models/Sheet";
import sheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use("/:sheetId/expenses", ExpenseRouter);
router.use("/:sheetId/permissions", PermissionRouter);

router
  .route("/")
  .get(
    advancedResults(
      Sheet,
      {
        path: "owner",
        select: "firstName lastName",
      },
      true,
    ),
    getSheets,
  )
  .post(addSheet);

router
  .route("/:id")
  .get([sheet, permission, viewPolicy], getSheet)
  .put([sheet, permission, editPolicy], updateSheet)
  .delete([sheet, permission, adminPolicy], deleteSheet);

export default router;
