const { User } = require("../models");

const format = (user) => {
  const { id, username, email } = user;
  return {
    id,
    username,
    email,
    token: user.generateToken(),
  };
};

exports.register = (req, res) => {
  try {
    User.register(req.body)
      .then((data) => {
        res.json({ status: "Register success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Register failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Register failed", msg: err });
  }
};

exports.login = (req, res) => {
  try {
    User.authentication(req.body)
      .then((data) => {
        res.json({ status: "Login success", data: format(data) });
      })
      .catch((err) => {
        res.status(400).json({ status: "Login failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Login failed", msg: err });
  }
};

// exports.forgotPassword = (req, res) => {
//   try {
//     User.forgotPass()
//       .then(() => {
//         res.json({ msg: "Mail sent" });
//       })
//       .catch((err) => {
//         res.status(400).json({ status: "Failed to send mail", msg: err });
//       });
//   } catch (err) {
//     res.status(500).json({ status: "Failed to send mail", msg: err });
//   }
// };
