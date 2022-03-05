const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
    },

    username: {
      type: String,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);
