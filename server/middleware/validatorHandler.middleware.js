const validatorHandler = schema => {
  return (req, res, next) => {
    const data = { ...req.params, ...req.body, ...req.query };

    const { error } = schema.validate(data);

    if (error) {
      error.status = 400;
      throw error;
    }

    next();
  };
};

module.exports = validatorHandler;
