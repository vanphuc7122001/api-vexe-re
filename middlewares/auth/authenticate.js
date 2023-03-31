const jwt = require("jsonwebtoken");
// xác thực xem người dùng đăng nhập chưa
const authenticate = (req, res, next) => {
  try {
    const token = req.header("token");
    const decoded = jwt.verify(token, "b1910432");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({
        msg: "Bạn chưa chưa đăng nhập",
      });
    }
  } catch (error) {
    res.status(401).send({
      msg: "Bạn chưa chưa đăng nhập",
    });
  }
};

module.exports = {
  authenticate,
};
