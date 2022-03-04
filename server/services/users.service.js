const User = require('../models/User.model');
const { hash } = require('bcrypt');

class UserService {
  constructor(showPassword) {
    this.showPassword = showPassword;
  }

  async findAll() {
    const users = await User.find().exec();

    if (!this.showPassword) {
      users.forEach(user => {
        user.password = undefined;
      });
    }

    return users;
  }

  async findById(data) {
    const user = await User.findById(data);

    if (user && !this.showPassword) {
      user.password = undefined;
    }

    return user;
  }

  async findByEmail(data) {
    const user = await User.findOne({ email: data }).exec();

    if (user && !this.showPassword) {
      user.password = undefined;
    }

    return user;
  }

  async findByUsername(data) {
    const user = await User.findOne({ username: data }).exec();

    if (user && !this.showPassword) {
      user.password = undefined;
    }

    return user;
  }

  async createUser(data) {
    const { firstName, lastName, password } = data;

    const sanitizedData = {
      ...data,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: await hash(password, 10),
    };

    const user = await User.create({ ...sanitizedData });

    if (user && !this.showPassword) {
      user.password = undefined;
    }

    return user;
  }
}

module.exports = UserService;
