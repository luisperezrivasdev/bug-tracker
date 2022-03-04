const express = require('express');

const validatorHandler = require('../middleware/validatorHandler.middleware');
const { isAuthenticated, checkRoles } = require('../middleware/auth.middlware');
const {
  findUserByIdSchema,
  createUserSchema,
} = require('../schemas/user.schemas');
const {
  findAll,
  findById,
  createUser,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', isAuthenticated, checkRoles('ADMIN'), findAll);

router.get('/:id', validatorHandler(findUserByIdSchema), findById);

router.post('/', validatorHandler(createUserSchema), createUser);

module.exports = router;
