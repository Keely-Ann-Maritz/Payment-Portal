const express = require('express');
const { register, login, logout } = require('../controllers/authController.js');

// calling rate limiting package (Zanini, 2024)
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

// Setting the limit to 5 minutes after 5 consecutive attempts at logging in which helps against DDOS attacks (Zanini, 2024)
const loginlimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    message: "Too many attempts. Try again in 5 minutes",
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

// login and register are POST requests, this is because we require the username, account nummber and password from the user 
// Including the rate limiting into the login form to apply to that endpoint (Zanini, 2024)
router.post('/login', loginlimiter, login);
router.post('/register', register);
// logout is a GET request, as we are just reading the token from the request header
router.get('/logout', logout);

module.exports = router;

// References
// Zanini, A., 2024.How to Implement Rate Limiting in Express for Node.js. [online] Available at: <https://blog.appsignal.com/2024/04/03/how-to-implement-rate-limiting-in-express-for-nodejs.html> [Accessed 9 October 2025].