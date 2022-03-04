const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middleware/validatorHandler.middleware');
const { isAuthenticated } = require('../middleware/auth.middlware');
const { loginSchema } = require('../schemas/auth.schemas');
const { login, logout } = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/login',
  validatorHandler(loginSchema),
  passport.authenticate('local', { failWithError: true }),
  login
);

router.post('/logout', isAuthenticated, logout);

module.exports = router;
