const { Ticket } = require("../models");

class ticketController {
  async getAllTicket(req, res, next) {
    const ticketList = await Ticket.findAll();
    if (ticketList.length > 0) {
      res.status(200).send(ticketList);
    } else {
      res.status(404).send({ msg: "Empty!!" });
    }
  }

  async getDetailTicket(req, res, next) {
    const { id } = req.params;
    const ticket = await Ticket.findOne();
    if (ticket) {
      res.status(200).send(ticket);
    } else {
      res.status(404).send({ msg: "Not Found!!" });
    }
  }

  async createTicket(req, res, next) {
    const { trip_id, user_id } = req.body;
    try {
      const status = await Ticket.create({
        trip_id,
        user_id,
      });
      if (status) {
        res.status(201).send({ msg: "Tạo vé  thành công" });
      } else {
        res.status(500).send({ msg: "Tạo vé Thất bại" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateTicket(req, res) {
    const { id } = req.params;
    const { trip_id, user_id, status } = req.body;
    try {
      const flag = await Ticket.update(
        { trip_id, user_id, status },
        {
          where: {
            id,
          },
        }
      );
      if (flag[0] == 1) {
        res.status(200).send({ msg: "update successful" });
      } else {
        res.status(500).send({ msg: "update thất bại" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new ticketController();
