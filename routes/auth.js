const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth');
const validateUserCreation = require('../middleware/auth/validateUserCreation');
const validateLogin = require('../middleware/auth/validateLogin');

const router = express.Router();

router.post('/signup', validateUserCreation, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;
