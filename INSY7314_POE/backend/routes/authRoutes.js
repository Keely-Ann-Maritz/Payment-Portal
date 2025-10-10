const express = require('express');
const { register, login, logout } = require('../controllers/authController.js');
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

const loginlimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    message: "Too many attempts. Try again in 5 minutes",
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
});
// login and register are POST requests
// this is because we require the username and password from the user
router.post('/login', loginlimiter, login);
router.post('/register', register);
// logout is a GET request, as we are just reading the token from the request header
router.get('/logout', logout);

module.exports = router;