"use strict";
const { Model } = require("sequelize");
const { CourseDetail } = require("./coursedetail");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Courses.hasOne(models.CourseDetail, {
        foreignKey: "course_id",
        as: "course_detail",
      });
      models.Courses.hasMany(models.Mentors, {
        foreignKey: "course_id",
        as: "course_mentors",
      });
    }

    static addCourse = async ({ name, price, image }) => {
      if (name === "") return Promise.reject("Course name cannot be empty!");

      const isCourseExist = await this.findOne({ where: { name: name } });
      if (!isCourseExist) {
        return this.create({
          name,
          price,
          image,
        });
      } else {
        return Promise.reject("Course already exists");
      }
    };

    static updateCourse = async ({ id, name, price, image }) => {
      const course = await this.findOne({ where: { id } });
      if (course) {
        await course.update({
          ...(name && { name }),
          ...(price && { price }),
          ...(image && { image }),
        });
        return Promise.resolve(course);
      }
      return Promise.reject("Course not found");
    };

    static deleteCourse = async ({ id }) => {
      const course = await this.findOne({ where: { id } });
      if (course) {
        await course.destroy();
        return Promise.resolve("Course has been deleted");
      }
      return Promise.reject("Course not found");
    };
  }
  Courses.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  return Courses;
};
