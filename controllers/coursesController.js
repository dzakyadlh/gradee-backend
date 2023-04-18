const { Courses } = require("../models");

exports.get = (req, res) => {
  try {
    Courses.findAll()
      .then((data) => {
        res.json({ status: "Fetch success", data });
      })
      .catch((err) => {
        res.status(500).json({ status: "Fetch error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.create = (req, res) => {
  try {
    Courses.addCourse(req.body)
      .then((data) => {
        res.json({ status: "Create success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Create error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.update = (req, res) => {
  try {
    Courses.updateCourse(req.body)
      .then((course) => {
        res.json({ status: "Update success", course });
      })
      .catch((err) => {
        res.status(400).json({ status: "Update error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.delete = (req, res) => {
  try {
    Courses.deleteCourse({ id: req.params.id })
      .then((data) => {
        res.json({ status: "Delete success", msg: err });
      })
      .catch((err) => {
        res.status(400).json({ status: "Delete error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};
