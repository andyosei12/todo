const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('../logger');
const User = require('../models/user.model');

dotenv.config();

const registerUser = async (req, res) => {
  //   Check if email exists
  logger.info('(User) => register process started');
  try {
    const existingUser = await User.findOne({ user_name: req.body.user_name });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    const user = await User.create({
      ...req.body,
    });

    const token = jwt.sign(
      { user_name: user.user_name, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    logger.info('(User) => register process successful');
    return res.status(201).json({
      token,
      user,
      message: 'User added successfully',
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'An error occured',
      err: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const user_name = req.body.user_name;
  const passwordInput = req.body.password;
  logger.info('(User) => login process started');
  try {
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User does not exist. Try signing up',
      });
    }

    const validPassword = await user.isValidPassword(passwordInput);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Username or password is not correct',
      });
    }
    const token = jwt.sign(
      { user_name: user.user_name, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successfully',
      token,
      user,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: 'An error occured',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
