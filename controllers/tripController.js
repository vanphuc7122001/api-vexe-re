const { Trip, Station } = require("../models");

class tripController {
  async createTrip(req, res) {
    const { fromStation, toStation, startTime, price } = req.body;
    const status = await Trip.create({
      fromStation: fromStation,
      toStation: toStation,
      startTime,
      price,
    });
    if (status) {
      res.status(201).send("Tạo thành công");
    } else {
      res.status(500).send("Tạo thất bại");
    }
  }

  async getAllTrip(req, res, next) {
    const tripList = await Trip.findAll({
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });
    if (tripList.length > 0) {
      res.status(200).send(tripList);
    } else {
      res.status(404).send({ msg: "Empty trip list" });
    }
  }

  async getDetailTrip(req, res, next) {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });

    if (trip) {
      res.status(200).send(trip);
    } else {
      res.status(404).send({ msg: "Not Found!!" });
    }
  }

  async deleteTrip(req, res) {
    const { id } = req.params;
    const status = await Trip.destroy({
      where: { id },
    });

    if (status) {
      res.status(200).send({ msg: "delete trip successfully" });
    } else {
      res.status(404).send({ msg: "Not found!" });
    }
  }

  async updateTrip(req, res) {
    const { id } = req.params;
    const { fromStation, toStation, startTime, price } = req.body;
    const status = await Trip.update(
      {
        fromStation,
        toStation,
        startTime,
        price,
      },
      {
        where: {
          id,
        },
      }
    );
    if (status[0] === 1) {
      res.status(200).send({ msg: `Updated successfully at ${id}` });
    } else {
      res.status(500).send({ msg: `Failed to update` });
    }
  }
}

module.exports = new tripController();
