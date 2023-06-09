const router = require("express").Router();
const courses = require("../controllers/coursesController");

router.get("/", courses.get);
router.get("/:id", courses.getOne);
router.post("/", courses.create);
router.put("/", courses.update);
router.delete("/:id", courses.delete);

module.exports = router;
