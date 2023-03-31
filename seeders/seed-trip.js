"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("trips", [
      {
        fromStation: 1,
        toStation: 2,
        startTime: "2023-03-29 11:56:42",
        price: 150.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fromStation: 2,
        toStation: 1,
        startTime: "2023-03-29 11:56:42",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fromStation: 3,
        toStation: 4,
        startTime: "2023-03-29 11:56:42",
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fromStation: 4,
        toStation: 3,
        startTime: "2023-03-29 11:56:42",
        price: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("trips", null, {});
  },
};
