const { User } = require("../../models");

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  const isEmail = await User.findOne({
    where: {
      email,
    },
  });

  if (isEmail) {
    res.status(500).send({
      msg: "Email was exits",
    });
  } else {
    next();
  }
};

module.exports = {
  checkEmail,
};
