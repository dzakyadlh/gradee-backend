"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mentors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Mentors.belongsTo(models.Courses, {
        foreignKey: "course_id",
        as: "course_mentors",
      });
    }

    static addMentor = async ({
      name,
      bio,
      job,
      company,
      dateofbirth,
      address,
      city,
      country,
      portofolio,
      image,
      course_id,
    }) => {
      if (name === "" || job === "" || company === "" || course_id === "")
        return Promise.reject("Fill all the required form");
      const isMentorExist = await this.findOne({ where: { name } });
      if (!isMentorExist) {
        return this.create({
          name,
          bio,
          job,
          company,
          dateofbirth,
          address,
          city,
          country,
          portofolio,
          image,
          course_id,
        });
      } else return Promise.reject("Mentor already exists!");
    };

    static updateMentor = async ({
      name,
      bio,
      job,
      company,
      dateofbirth,
      address,
      city,
      country,
      portofolio,
      image,
      course_id,
    }) => {
      const mentor = await this.findOne({ where: { id } });
      if (mentor) {
        await mentor.update({
          ...(name && { name }),
          ...(bio && { bio }),
          ...(job && { job }),
          ...(company && { company }),
          ...(dateofbirth && { dateofbirth }),
          ...(address && { address }),
          ...(city && { city }),
          ...(country && { country }),
          ...(portofolio && { portofolio }),
          ...(image && { image }),
          ...(course_id && { course_id }),
        });
      } else return Promise.reject("Mentor already exists!");
    };

    static deleteMentor = async ({ id }) => {
      const mentor = await this.findOne({ where: { id } });
      if (mentor) {
        await mentor.destroy();
        return mentor.name;
      }
      return Promise.reject("Mentor not found");
    };
  }
  Mentors.init(
    {
      name: DataTypes.STRING,
      bio: DataTypes.STRING,
      job: DataTypes.STRING,
      company: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      portofolio: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mentors",
    }
  );
  return Mentors;
};
