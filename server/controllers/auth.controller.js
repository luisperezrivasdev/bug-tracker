const asyncHandler = require('express-async-handler');

const env = require('../config/environment.config');

// @desc    Login
// @route   Post /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({ data: { user } });
});

// @desc    Logout
// @route   Post /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  req.session.destroy();

  res.clearCookie(env.SESSION_NAME);

  res.status(200).end();
});

module.exports = { login, logout };
