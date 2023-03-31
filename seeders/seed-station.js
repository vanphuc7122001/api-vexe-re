"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("stations", [
      {
        name: "Bến Xe Miền Tây",
        address: "395 Nguyển Văn Linh",
        province: "HCM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bến Xe Cần Thơ",
        address: "395 Dương Văn Quan",
        province: "CT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bến Xe Đồng Tháp",
        address: "395 Dương Văn Quan",
        province: "DT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bến Xe Vỉnh Long",
        address: "395 Dương Văn Quan",
        province: "VL",
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
    await queryInterface.bulkDelete("stations", null, {});
  },
};
