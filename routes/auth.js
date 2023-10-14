const express = require('express');
const { registerUser, loginUser } = require('../users/users.controller');
const validateUserCreation = require('../middleware/auth/validateUserCreation');
const validateLogin = require('../middleware/auth/validateLogin');

const router = express.Router();

router.post('/signup', validateUserCreation, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;
