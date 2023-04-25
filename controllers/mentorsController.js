const { Mentors } = require("../models");

exports.get = (req, res) => {
  try {
    Mentors.findAll()
      .then((data) => {
        res.json({ status: "Fetch success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Fetch error", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.getOne = (req, res) => {
  try {
    const mentorId = req.params.id;
    Mentors.findOne({ where: { id: mentorId } })
      .then((data) => {
        if (!data)
          res
            .status(400)
            .json({ status: `Mentor with id: ${mentorId} not found.` });
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
    Mentors.addMentor(req.body)
      .then((data) => {
        res.json({ status: "Mentor added", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Adding mentor failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.update = (req, res) => {
  try {
    Mentors.updateMentor(req.body)
      .then((data) => {
        res.json({ status: "Mentor data updated", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Updating mentor failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};

exports.delete = (req, res) => {
  try {
    const mentorId = req.params.id;
    Mentors.deleteMentor(mentorId)
      .then((data) => {
        res.json({ status: `Mentor ${data} deleted` });
      })
      .catch((err) => {
        res.status(400).json({ status: "Deleting mentor failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Server error", msg: err });
  }
};
