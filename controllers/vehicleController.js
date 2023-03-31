const { Vehicle } = require("../models");

class vehicleController {
  async create(req, res) {
    const { name, passengerCarCompanies_id } = req.body;
    try {
      const check = await Vehicle.create({
        name,
        passengerCarCompanies_id,
      });
      res.status(201).send({ msg: "created successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAll(req, res) {
    try {
      const allVehicle = await Vehicle.findAll();
      res.status(200).send(allVehicle);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getDetail(req, res) {
    const { id } = req.params;
    try {
      const vehicle = await Vehicle.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(vehicle);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, passengerCarCompanies_id } = req.body;

    try {
      await Vehicle.update(
        {
          name,
          passengerCarCompanies_id,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send({ msg: "updated successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Vehicle.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({ msg: "deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new vehicleController();
