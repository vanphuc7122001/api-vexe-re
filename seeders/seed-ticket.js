"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tickets", [
      {
        status: 0,
        trip_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 0,
        trip_id: 1,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 0,
        trip_id: 1,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 0,
        trip_id: 2,
        user_id: 1,
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
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
