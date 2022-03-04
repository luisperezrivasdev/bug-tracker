const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
  };
};

module.exports = { isAuthenticated, checkRoles };
