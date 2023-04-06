"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = async ({ email, username, password }) => {
      const encryptedPassword = this.#encrypt(password);

      if (email == "" || username == "" || password == "")
        return Promise.reject("Fill all the empty fields");

      const isEmailExist = await this.findOne({ where: { email: email } });
      const isUserExist = await this.findOne({ where: { username: username } });

      if (!isEmailExist) {
        if (!isUserExist) {
          return this.create({
            email,
            username,
            password: encryptedPassword,
          });
        } else {
          return Promise.reject("Username already exists!");
        }
      } else {
        return Promise.reject("Email already exists!");
      }
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const secret = "This secret is mine and only mine";
      const token = jwt.sign(payload, secret);

      return token;
    };

    static authentication = async ({ email, password }) => {
      try {
        const isEmailExist = await this.findOne({ where: { email: email } });
        if (isEmailExist) {
          const passVerified = isEmailExist.checkPassword(password);
          if (!passVerified) return Promise.reject("Incorrect password");
          return Promise.resolve(isEmailExist);
        } else return Promise.reject("Email not found");
      } catch (err) {
        return Promise.reject(err);
      }
    };

    // static forgotPassword = async ({ user }) => {
    //   try {
    //     const isEmailExist = await this.findOne({ where: { email: user } });
    //     const isUsernameExist = await this.findOne({
    //       where: { username: user },
    //     });
    //     if (!isEmailExist || !isUsernameExist)
    //       return Promise.reject("User does not exist!");
    //     const token = await this.generateToken();
    //     const link = `${process.env.BASE_URL}/passwordReset/${username}/${token}`;
    //     await sendEmail(user.email, "Password reset", link);
    //   } catch (err) {
    //     return Promise.reject(err);
    //   }
    // };
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
