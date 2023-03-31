const { PassengerCarCompany } = require("../models");

class passengerCarCompaniesController {
  async create(req, res, next) {
    const { name, description, trip_id } = req.body;
    try {
      const check = await PassengerCarCompany.create({
        name,
        description,
        trip_id,
      });
      if (check) {
        res.status(201).send({ msg: "Tạo thành công" });
      } else {
        res.status(500).send({ msg: "Tạo thất bại" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async showAll(req, res, next) {
    try {
      const listCompany = await PassengerCarCompany.findAll();
      if (listCompany.length > 0) {
        res.status(200).send(listCompany);
      } else {
        res.status(404).send({ msg: "List company not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async showDetail(req, res, next) {
    const { id } = req.params;
    try {
      const detail = await PassengerCarCompany.findOne({
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
    const { name, description, trip_id } = req.body;
    try {
      const updated = await PassengerCarCompany.update(
        { name, description, trip_id },
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
    const { id } = req.params;
    try {
      const deleted = await PassengerCarCompany.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({ msg: "deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async uploadImages(req, res) {
    const { file } = req;
    const urlImage = `http://localhost:3000/${file.path}`;
    const { id } = req.params;
    try {
      const foundPcc = await PassengerCarCompany.findOne({
        where: {
          id,
        },
      });
      foundPcc.image = urlImage;
      await foundPcc.save();
      res.status(200).send(foundPcc);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new passengerCarCompaniesController();
