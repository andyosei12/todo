const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');

dotenv.config();

const registerUser = async ({ first_name, last_name, user_name, password }) => {
  //   Check if email exists
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
    return {
      code: 201,
      data: {
        token,
        user,
      },
      message: 'User added successfully',
    };
  } catch (err) {
    return {
      code: 500,
      message: 'An error occured',
      error: true,
      err: err.message,
    };
  }
};

const loginUser = async ({ user_name, password }) => {
  //   Check if user exists
  try {
    const user = await User.findOne({ user_name: user_name.toLowerCase() });
    if (!user) {
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
    return {
      code: 200,
      data: {
        token,
        user,
      },
      message: 'Login successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      error: true,
      message: 'An error occured',
    };
  }
};

module.exports = { registerUser, loginUser };
