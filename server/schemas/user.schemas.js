const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const env = require('../config/environment.config');

const usernamePattern = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/;
const namePattern =
  /^(?!.*['-]{2})[\W'-]*[^0-9.,_!¡÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]*$/;

const id = Joi.objectId();
const firstName = Joi.string().regex(namePattern, 'name').max(256);
const lastName = Joi.string().regex(namePattern, 'name').max(256);
const email = Joi.string().email();
const username = Joi.string().regex(usernamePattern, 'username').max(16);
const password = Joi.string().regex(passwordPattern, 'password').min(8).max(64);
const role = Joi.string().valid(...env.ROLES);

const findUserByIdSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  username: username.required(),
  password: password.required(),
  role: role.required(),
});

module.exports = { findUserByIdSchema, createUserSchema };
