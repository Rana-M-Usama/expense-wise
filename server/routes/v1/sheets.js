const express = require("express");
const {
  getSheets,
  getSheet,
  addSheet,
  updateSheet,
  deleteSheet,
} = require("../../controllers/sheets");

const Sheet = require("../../models/Sheet");

// Include other resource routers
// const ExpenseRouter = require("./expenses");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../../middlewares/advancedResults");
const { protect } = require("../../middlewares/auth");
const {
  sheetPolicy,
  getSheetPolicy,
  updateSheetPolicy,
  deleteSheetPolicy,
} = require("../../middlewares/authorize/sheetPolicy");

// Re-route into other resource routers
// router.use("/:sheetId/expenses", ExpenseRouter);

router.use(protect);

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
  .post(sheetPolicy, addSheet);

router
  .route("/:id")
  .get([sheetPolicy, getSheetPolicy], getSheet)
  .put([sheetPolicy, updateSheetPolicy], updateSheet)
  .delete([sheetPolicy, deleteSheetPolicy], deleteSheet);

module.exports = router;
