const router = require("express").Router();
const mentors = require("../controllers/mentorsController");

router.get("/", mentors.get);
router.get("/:id", mentors.getOne);
router.post("/", mentors.create);
router.put("/", mentors.update);
router.delete("/:id", mentors.delete);

module.exports = router;
