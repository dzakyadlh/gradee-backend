const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const coursesRouter = require("./courses");

router.use("/auth", authRouter);
router.use("/courses", coursesRouter);

module.exports = router;
