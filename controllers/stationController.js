const { Station } = require("../models");
const { Op } = require("sequelize");

class stationController {
  async createStation(req, res, next) {
    const { name, address, province } = req.body;
    try {
      const newstation = await Station.create({ name, address, province });
      res.status(201).send(newstation);
    } catch (error) {
      res.status(500).send(error); // lổi server
    }
  }

  async getAllStation(req, res, next) {
    const { name } = req.query;
    if (name) {
      const station = await Station.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).send(station);
    } else {
      try {
        const allStation = await Station.findAll();
        if (allStation.length < 1) {
          res.status(404).send({
            msg: "Empty station",
          });
        } else {
          res.status(200).send(allStation);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }

  async getDetailStation(req, res, next) {
    const { id } = req.params;
    try {
      const station = await Station.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(station);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateStation(req, res, next) {
    const { id } = req.params;
    const { name, address, province } = req.body;
    try {
      const stationById = await Station.findOne({
        where: {
          id,
        },
      });
      stationById.name = name;
      stationById.address = address;
      stationById.province = province;
      await stationById.save();
      res.status(200).send(stationById);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteStation(req, res, next) {
    const { id } = req.params;
    try {
      await Station.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        msg: "Station deleted successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new stationController();
