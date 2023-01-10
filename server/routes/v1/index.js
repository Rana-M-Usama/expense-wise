const express = require("express");

const auth = require("./auth");
const sheets = require("./sheets");

const router = express.Router();

router.use("/auth", auth);
router.use("/sheets", sheets);

module.exports = router;
