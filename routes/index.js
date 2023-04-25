const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const coursesRouter = require("./courses");
const mentorsRouter = require("./mentors");

router.use("/auth", authRouter);
router.use("/courses", coursesRouter);
router.use("/mentors", mentorsRouter);

module.exports = router;
