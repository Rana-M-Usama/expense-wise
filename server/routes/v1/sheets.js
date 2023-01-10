const express = require("express");

const {
  getSheets,
  getSheet,
  addSheet,
  updateSheet,
  deleteSheet,
} = require("../../controllers/sheets");
const Sheet = require("../../models/Sheet");
const advancedResults = require("../../middlewares/advancedResults");
const { protect } = require("../../middlewares/auth");
const {
  sheetPolicy,
  getSheetPolicy,
  updateSheetPolicy,
  deleteSheetPolicy,
} = require("../../middlewares/authorize/sheetPolicy");

const router = express.Router({ mergeParams: true });

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
  .post(addSheet);

router
  .route("/:id")
  .get([sheetPolicy, getSheetPolicy], getSheet)
  .put([sheetPolicy, updateSheetPolicy], updateSheet)
  .delete([sheetPolicy, deleteSheetPolicy], deleteSheet);

module.exports = router;
