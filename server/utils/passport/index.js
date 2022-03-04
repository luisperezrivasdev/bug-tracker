const passport = require('passport');

const UserService = require('../../services/users.service');
const service = new UserService(false);

const localStrategy = require('./strategies/local.strategy');

module.exports = () => {
  passport.use(localStrategy);

  passport.serializeUser((user, done) => {
    if (!user) {
      return done(null, false);
    }

    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await service.findById(id);

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
