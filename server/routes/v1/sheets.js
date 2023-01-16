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
  sheetPolicy,
  viewPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import ExpenseRouter from "./expenses";
import { permissionPolicy } from "../../middlewares/authorize/permissionPolicy";
import PermissionRouter from "./permission";
import protect from "../../middlewares/auth";
import Sheet from "../../models/Sheet";

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
  .get([sheetPolicy, permissionPolicy, viewPolicy], getSheet)
  .put([sheetPolicy, permissionPolicy, editPolicy], updateSheet)
  .delete([sheetPolicy, permissionPolicy, adminPolicy], deleteSheet);

export default router;
