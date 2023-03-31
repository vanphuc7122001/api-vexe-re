"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PassengerCarCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip, Vehicle }) {
      this.belongsTo(Trip, { foreignKey: "trip_id" });
      this.hasMany(Vehicle, { foreignKey: "passengerCarCompanies_id" });
    }
  }
  PassengerCarCompany.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PassengerCarCompany",
    }
  );
  return PassengerCarCompany;
};
