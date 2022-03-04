const express = require('express');
const passport = require('passport');
const session = require('express-session');

const passportStrategies = require('./utils/passport');
const env = require('./config/environment.config');
const { mongoConnect, sessionConfig } = require('./config/db.config');
const {
  notFoundError,
  errorHandler,
} = require('./middleware/errorHandler.middleware');

mongoConnect();

const app = express();
app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passportStrategies();

app.use('/api', require('./routes'));

app.use(notFoundError);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
