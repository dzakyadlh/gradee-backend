"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.CourseDetail.belongsTo(models.Courses, {
        foreignKey: "course_id",
        as: "course_detail",
      });
    }

    static addCourse = async ({
      course_id,
      description,
      overview,
      invitation,
    }) => {
      return this.create({
        description,
        overview,
        invitation,
        course_id,
      });
    };

    static updateCourse = async ({ id, description, overview, invitation }) => {
      const course = await this.findOne({ where: { course_id: id } });
      if (course) {
        await course.update({
          ...(description && { description }),
          ...(overview && { overview }),
          ...(invitation && { invitation }),
        });
        return course;
      } else {
        return this.create({
          description,
          overview,
          invitation,
          course_id: id,
        });
      }
    };

    static deleteCourse = async ({ course_id }) => {
      const course = await this.findOne({ where: { course_id } });
      if (course) {
        await course.destroy();
        return Promise.resolve("Course has been deleted");
      }
      return Promise.reject("Course not found");
    };
  }
  CourseDetail.init(
    {
      description: DataTypes.STRING,
      overview: DataTypes.STRING,
      invitation: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseDetail",
    }
  );
  return CourseDetail;
};
