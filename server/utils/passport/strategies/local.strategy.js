const { Strategy } = require('passport-local');
const { compare } = require('bcrypt');

const UserService = require('../../../services/users.service');
const service = new UserService(true);

module.exports = new Strategy(async (username, password, done) => {
  try {
    const user = await service.findByUsername(username);

    if (!user) {
      return done(null, false);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return done(null, false);
    }

    user.password = undefined;

    return done(null, user);
  } catch (err) {
    done(err, false);
  }
});
