// phần quyền người dùng

const authorize = (arrType) => {
  return (req, res, next) => {
    const { user } = req;
    if (arrType.findIndex((item) => item === user.type) !== -1) {
      next();
    } else {
      res.status(403).send({
        msg: "Bạn đả đăng nhập nhưng không có quyền thực hiện thao tác này",
      });
    }
  };
};

module.exports = {
  authorize,
};
