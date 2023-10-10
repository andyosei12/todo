const express = require('express');
const validateUserCreation = require('../middleware/auth/validateUserCreation');
const { registerUser } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', validateUserCreation, registerUser);

module.exports = router;
