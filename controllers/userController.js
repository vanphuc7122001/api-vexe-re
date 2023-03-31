const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url");
const { sequelize } = require("../models");

class userController {
  async register(req, res, next) {
    const { name, email, password, numberPhone } = req.body;
    try {
      // tạo ra 1 chuổi ngẩu nhiên
      const salt = bcrypt.genSaltSync(10);
      // hash password = password + salt
      var hashPassword = bcrypt.hashSync(password, salt);

      //tạo avatar mặc định theo email
      const avatarUrl = gravatarUrl(email);

      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        numberPhone,
        avatar: avatarUrl,
      });
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const token = jwt.sign(
          { email: user.email, type: user.type, id: user.id },
          "b1910432",
          {
            expiresIn: "1h",
          }
        );
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
          res.status(200).send({ msg: "Đăng Nhập Thành Công", token });
        } else {
          res.status(400).send({ msg: "Sai Tài Khoản hoặc mật khẩu" });
        }
      } else {
        res.status(404).send({ msg: "Email không tồn tại" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async uploadAvatar(req, res) {
    const { file } = req;
    res.send(file);
    const urlImage = `http://localhost:3000/${file.path}`;
    const { user } = req;
    const foundUser = await User.findOne({
      email: user.email,
    });
    foundUser.avatar = urlImage;
    await foundUser.save();
  }

  // lấy tất cả các chuyến đi của tất cả người dùng đả đặt
  async getAllTripOfUsers(req, res, next) {
    const [results, metadata] =
      await sequelize.query(`select users.name as user_name, fromSta.name as fromStation,toSta.name as toStation from users 
    inner join tickets on users.id = tickets.user_id
    inner join trips on trips.id = tickets.trip_id
    inner join stations as fromSta on  fromSta.id = trips.fromStation
    inner join stations as toSta on toSta.id = trips.toStation`);

    res.status(200).json({
      results: results ? results : "Không có chuyến đi nào",
    });
  }

  async getAllTicketThatUserOrder(req, res, next) {
    const { id } = req.params;
    try {
      const [results, metadata] =
        await sequelize.query(`select users.name as user_name, fromSta.name as fromStation,toSta.name as toStation from users 
    inner join tickets on users.id = tickets.user_id
    inner join trips on trips.id = tickets.trip_id
    inner join stations as fromSta on  fromSta.id = trips.fromStation
    inner join stations as toSta on toSta.id = trips.toStation
    where users.id = ${id}`);

      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        results.status(404).send({ msg: "No results found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getInfoTrips(req, res, next) {
    try {
      const [results, metadata] = await sequelize.query(`select 
        fromSta.name as fromStation,
        toSta.name as toStation,
        passengercarcompanies.name as passengercarcompanies_name,
        vehicles.name as vehicles_name,
        seats.name as seats_name,
        seats.status as seats_status
        from trips
        inner join stations as fromSta on  fromSta.id = trips.fromStation
        inner join stations as toSta on toSta.id = trips.toStation
        inner join passengercarcompanies on trips.id = passengercarcompanies.trip_id
        inner join vehicles on  passengercarcompanies.id = vehicles.passengerCarCompanies_id
        inner join seats on vehicles.id = seats.vehicled_id`);

      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        results.status(404).send({ msg: "No results found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new userController();
