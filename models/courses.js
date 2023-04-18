"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addCourse = async ({ name, detail, price, image }) => {
      if (name === "" || detail === "" || price === "")
        return Promise.reject("Fill all the empty fields");

      const isCourseExist = await this.findOne({ where: { name: name } });
      if (!isCourseExist) {
        return this.create({
          name,
          detail,
          price,
          image,
        });
      } else {
        return Promise.reject("Course already exists");
      }
    };

    static updateCourse = async ({ id, name, detail, price, image }) => {
      const course = await this.findOne({ where: { id } });
      if (course) {
        course.update({
          ...(name && { name }),
          ...(detail && { detail }),
          ...(price && { price }),
          ...(image && { image }),
        });
        return course;
      }
      return Promise.reject("Course not found");
    };

    static deleteCourse = async ({ id }) => {
      const course = await this.findOne({ where: { id } });
      if (course) {
        await course.destroy();
        return `${course.name} has been deleted`;
      }
      return Promise.reject("Course not found");
    };
  }
  Courses.init(
    {
      name: DataTypes.STRING,
      detail: DataTypes.STRING,
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
