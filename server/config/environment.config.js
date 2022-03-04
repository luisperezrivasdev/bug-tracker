if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_NAME: process.env.SESSION_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_AGE: Number(process.env.SESSION_AGE),
  IN_PROD: process.env.NODE_ENV !== 'development',
  ROLES: ['USER', 'ADMIN'],
};

module.exports = env;
