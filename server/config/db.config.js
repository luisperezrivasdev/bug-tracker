const { connect } = require('mongoose');
const MongoStore = require('connect-mongo');

const env = require('./environment.config');

const mongoConnect = async () => {
  try {
    await connect(env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
  }
};

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  rolling: true,
  name: env.SESSION_NAME,
  secret: env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    maxAge: env.SESSION_AGE,
  },
};

module.exports = { mongoConnect, sessionConfig };
