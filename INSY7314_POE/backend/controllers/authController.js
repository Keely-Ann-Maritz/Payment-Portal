const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware.js');
const User = require('../models/userModel.js');
require('dotenv').config();

// helper method to generate our tokens, that takes in the username
const generateJwt = (username) => {
    // signs it using our secret (that it pulls from .env)
    return jwt.sign({ username }, process.env.JWT_SECRET, {
        // set an expiry of 1 hour from signing
        expiresIn: "1h",
    });
    // and returns it.
};

const register = async (req, res) => {
    // pull the required information from the incoming request
    const { username, password, fullname, idnumber, accountnumber } = req.body;
    // before signing the user up, we need to check if their username is already in use
    const exists = await User.findOne({ username: username })
    // if it is, say no
    if (exists) return res.status(400).json({ message: "User already exists." });
    // if not, lets hash their password (by providing their password, and the number of random iterations to salt)
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedidnumber = await bcrypt.hash(idnumber, 10);
    const hashedAccountNumber = await bcrypt.hash(accountnumber.toString(), 10);

    try {
        await User.create({ username: username, password: hashedPassword, fullname: fullname, idnumber: hashedidnumber, accountnumber: hashedAccountNumber });
        res.status(200).json({ token: generateJwt(username) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    } res.status(500).json({ error: e.message });

};

const login = async (req, res) => {
    const { username, password, accountnumber } = req.body;
    const exists = await User.findOne({ username: username })

    // if the user is not present in our collection, let them know to try again
    if (!exists) return res.status(400).json({ message: "Invalid credentials." });

    // next, if the user DOES exist, we compare their entered password to what we have on file
    const matchingPassword = await bcrypt.compare(password, exists.password);
    const matchingAccountNum = await bcrypt.compare(accountnumber, exists.accountnumber);

    // if they don't match, say no
    if (!matchingPassword || !matchingAccountNum) return res.status(400).json({ message: "Invalid credentials." });

    // otherwise, generate a token and log them in
    res.status(200).json({ token: generateJwt(username) });
};

const logout = async (req, res) => {
    // strip the header
    const authHeader = req.headers['authorization'];
    // grab the token (Bearer: <token>)
    const token = authHeader.split(" ")[1];
    // check if there is indeed a token, if not, yell at the user
    if (!token) return res.status(400).json({ message: "You need to be logged in before you can log out" });
    // otherwise invalidate the token
    invalidateToken(token);
    // and log em out
    res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout };
