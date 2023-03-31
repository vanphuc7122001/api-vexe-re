const { Seat } = require("../models");

class seatController {
  async create(req, res, next) {
    const { name, vehicled_id, status } = req.body;
    try {
      await Seat.create({
        name,
        vehicled_id,
        status,
      });
      res.status(201).send({ msg: "Seat created successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const all = await Seat.findAll();
      res.status(200).send(all);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getDetail(req, res, next) {
    const { id } = req.params;
    try {
      const detail = await Seat.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(detail);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, vehicled_id, status } = req.body;
    try {
      await Seat.update(
        {
          name,
          vehicled_id,
          status,
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

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      await Seat.destroy({
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

module.exports = new seatController();
