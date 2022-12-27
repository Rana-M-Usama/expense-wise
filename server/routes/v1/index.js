const express = require("express");
const httpStatus = require("http-status");

const router = express.Router();
const auth = require("./auth");

router.get("/", (req, res) =>
  res.status(httpStatus.OK).json({ expensewise: "Hello World!" }));
router.use("/auth", auth);

module.exports = router;
