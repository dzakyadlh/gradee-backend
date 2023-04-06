const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/register", auth.register);
router.post("/login", auth.login);
// router.post("/forgotPassword", auth.forgotPassword);

module.exports = router;
