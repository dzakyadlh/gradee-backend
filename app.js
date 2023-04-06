const createError = require("http-errors");
const express = require("express");
var cookieParser = require("cookie-parser");
const passport = require("./lib/passport");
const flash = require("express-flash");
const session = require("express-session");
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = 5000;

var app = express();

const router = require("./routes");

app.use(
  session({
    secret: "This is secret",
    resave: false,
    saveUnitializied: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
