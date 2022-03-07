const asyncHandler = require('express-async-handler');

const UserService = require('../services/users.service');
const service = new UserService(false);

// @desc    Find all users
// @route   GET /api/users
// @access  Private
const findAll = asyncHandler(async (req, res) => {
  const users = await service.findAll();

  res.status(200).json({ users });
});

// @desc    Find user by ID
// @route   GET /api/users/:id
// @access  Private
const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await service.findById(id);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  res.status(200).json({ user });
});

// @desc    Create user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  if (await service.findByEmail(email)) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }

  if (await service.findByUsername(username)) {
    const err = new Error('Username already registered');
    err.status = 409;
    throw err;
  }

  const user = await service.createUser(req.body);

  res.status(200).json({ user });
});

module.exports = {
  findAll,
  findById,
  createUser,
};
