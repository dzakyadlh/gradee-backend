"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Mentors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      job: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      dateofbirth: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      portofolio: {
        type: Sequelize.STRING,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Mentors");
  },
};
