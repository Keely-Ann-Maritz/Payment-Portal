const express = require('express');
const { register, login, logout, getEmployees, deleteEmployee, getUserDetails } = require('../controllers/adminAuthController.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');
const jwt = require('jsonwebtoken');
const adminUser = require('../models/adminUserModel.js');
// calling rate limiting package (Zanini, 2024)
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

const loginlimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    message: "Too many attempts. Try again in 5 minutes",
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

router.get('/getUserDetails', verifyToken, getUserDetails);

// login and register are POST requests, this is because we require the username, account nummber and password from the user 
// Including the rate limiting into the login form to apply to that endpoint (Zanini, 2024)
router.post('/adminLogin', loginlimiter, login);
router.post('/adminRegister', register);
// logout is a GET request, as we are just reading the token from the request header
router.get('/adminLogout', logout);

router.get('/getEmployees', getEmployees)

router.delete('/deleteEmployee/:id', deleteEmployee)

// logout is a GET request, as we are just reading the token from the request header
router.get('/logout', logout);

module.exports = router;
