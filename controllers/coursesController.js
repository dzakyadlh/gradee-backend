const { Courses } = require("../models");
const { CourseDetail } = require("../models");
const { Mentors } = require("../models");

exports.get = (req, res) => {
  try {
    Courses.findAll({
      include: [
        {
          model: CourseDetail,
          as: "course_detail",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "course_id"],
          },
        },
        {
          model: Mentors,
          as: "course_mentors",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "course_id"],
          },
        },
      ],
    })
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

exports.getOne = (req, res) => {
  try {
    const courseId = req.params.id;
    Courses.findOne({
      where: { id: courseId },
      include: [
        {
          model: CourseDetail,
          as: "course_detail",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "course_id"],
          },
        },
        {
          model: Mentors,
          as: "course_mentors",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "course_id"],
          },
        },
      ],
    })
      .then((data) => {
        if (!data)
          return res
            .status(400)
            .json({ status: "Course not found", msg: "Try another id" });
        res.json({ status: "Fetch success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Fetch error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.create = (req, res) => {
  try {
    Courses.addCourse(req.body)
      .then((data) => {
        CourseDetail.addCourse({
          course_id: data.id,
          description: req.body.description,
          overview: req.body.overview,
          invitation: req.body.invitation,
        })
          .then((data) => {
            res.json({ status: "Create success", data });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ status: "Create course detail error", msg: err });
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ status: "Create course main error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.update = (req, res) => {
  try {
    Courses.updateCourse(req.body)
      .then((course) => {
        CourseDetail.updateCourse(req.body)
          .then((course) => {
            res.json({ status: "Update course success" });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ status: "Update course detail error", msg: err });
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ status: "Update course main error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.delete = (req, res) => {
  try {
    Courses.deleteCourse({ id: req.params.id })
      .then((res) => {
        CourseDetail.deleteCourse({ course_id: req.params.id })
          .then((res) => {
            res.json({ status: "Delete course success", msg: res });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ status: "Delete course detail error", msg: err });
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ status: "Delete course main error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};
