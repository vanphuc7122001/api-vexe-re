"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip }) {
      this.hasMany(Trip, { foreignKey: "fromStation", as: "from" });
      this.hasMany(Trip, { foreignKey: "toStation", as: "to" });
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (value === null) {
              throw new Error("name can't be null");
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          checkLength(value) {
            if (value.length >= 5 && value.length <= 20) {
              return true;
            } else {
              throw new Error(
                "Độ dài của address must be between 5 and 20 characters"
              );
            }
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["HCM", "CT", "DT"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
