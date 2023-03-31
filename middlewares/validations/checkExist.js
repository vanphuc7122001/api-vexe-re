const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const params = await Model.findOne({
      where: {
        id,
      },
    });
    if (params) {
      next();
    } else {
      res.status(404).send({
        msg: `Not Found items having id is ${id}`,
      });
    }
  };
};

module.exports = {
  checkExist,
};
