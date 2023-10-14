const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const logger = require('../logger');

dotenv.config();

const registerUser = async ({ first_name, last_name, user_name, password }) => {
  //   Check if email exists
  logger.info('(User) => register process started');
  try {
    const existingUser = await User.findOne({ user_name });
    if (existingUser) {
      return {
        code: 409,
        error: true,
        message: 'User already exists',
      };
    }

    const user = await User.create({
      first_name,
      last_name,
      user_name: user_name.toLowerCase(),
      password,
    });

    const token = jwt.sign(
      { user_name: user.user_name, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    logger.info('(User) => register process successful');
    return {
      code: 201,
      data: {
        token,
        user,
      },
      message: 'User added successfully',
    };
  } catch (err) {
    logger.error(err);
    return {
      code: 500,
      message: 'An error occured',
      error: true,
      err: err.message,
    };
  }
};

const loginUser = async ({ user_name, password }) => {
  logger.info('(Login) => login process started');
  //   Check if user exists
  try {
    const user = await User.findOne({ user_name: user_name.toLowerCase() });
    if (!user) {
      logger.error('(Login) => user credentials not correct');
      return {
        error: true,
        message: 'User does not exist. Try signing up',
        code: 404,
      };
    }

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
      return {
        error: true,
        code: 401,
        message: 'Username or password is not correct',
      };
    }
    const token = jwt.sign(
      { user_name: user.user_name, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    logger.info('(Login) => login process successful');
    return {
      code: 200,
      data: {
        token,
        user,
      },
      message: 'Login successfully',
    };
  } catch (error) {
    logger.error(error);
    return {
      code: 500,
      error: true,
      message: 'An error occured',
    };
  }
};

module.exports = { registerUser, loginUser };
