const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');

dotenv.config();

const registerUser = async (req, res) => {
  //   Check if email exists
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    const user = await User.create({
      ...req.body,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      token,
      user,
      message: 'User added successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error occured',
      err: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  try {
    const user = await User.findOne({ email: emailInput });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User does not exist. Try signing up',
      });
    }

    const validPassword = await user.isValidPassword(passwordInput);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Email or password is not correct',
      });
    }
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successfully',
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occured',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
