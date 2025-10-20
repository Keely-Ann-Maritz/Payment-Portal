//importing bcrypt package to hash the passsword and account number
const bcrypt = require('bcryptjs');
// importing the json web token package since we are creating a token to generate a token upon login
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

// Getting the User Details (The Debug Arena,2025)
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
};

const register = async (req, res) => {
    // request the required register information from the incoming register request
    const { username, password, fullname, idnumber, accountnumber } = req.body;
    // before signing the user up, we need to check if their username is already in use
    const exists = await User.findOne({ username: username })
    // if it is, sent a error status 400 informting the user that the username has been taken
    if (exists) return res.status(400).json({ message: "User already exists." });
    // if not, lets hash their password (by providing their password, and the number of random iterations to salt) (Chaitanya, 2023)
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedidnumber = await bcrypt.hash(idnumber, 10);
    const hashedAccountNumber = await bcrypt.hash(accountnumber.toString(), 10);

    try {
        // method that stores the uesr registeration details in the database
        await User.create({ username: username, password: hashedPassword, fullname: fullname, idnumber: hashedidnumber, accountnumber: hashedAccountNumber });
        res.status(200).json({ token: generateJwt(username) });
    
    } catch (e) {
        //if user doesnt store , return teh error message
        res.status(500).json({ error: e.message });
    } res.status(500).json({ error: e.message });


};

const login = async (req, res) => {
    //requesting the login details
    const { username, password, accountnumber } = req.body;
    //Finding the username that matches one in the database
    const exists = await User.findOne({ username: username })

    // if the user is not present in our collection, let them know to try again
    if (!exists) return res.status(400).json({ message: "Invalid credentials." });

    // next, if the user DOES exist, we compare their entered account number and password to what we have hashed in mongo db  (Chaitanya, 2023)
    const matchingPassword = await bcrypt.compare(password, exists.password);
    const matchingAccountNum = await bcrypt.compare(accountnumber, exists.accountnumber);

    // if if the password or account number doesnt match, inform the user with a message under the status code 400
    if (!matchingPassword || !matchingAccountNum) return res.status(400).json({ message: "Invalid credentials." });

    // if credentials do match, generate and send a JWT token generated from the username, to the front end 
    const token = generateJwt(username);
    
    // Token with HTTPOnly (The Debug Arena,2025)
    res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24*60*60*1000
    });
    
    res.status(200).json({ message: "Logged in successfully!",token});
};

const logout = async (req, res) => {
    const token = req.cookies?.token;
    // check if there is indeed a token, if not, send an error back to the user
    if (!token) return res.status(400).json({ message: "You need to be logged in before you can logout" });
    // oif a token exist, invalidate it
    invalidateToken(token);

    // Clearing the token (The Debug Arena,2025)
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });

    // and they can now be logged out
    res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout, getUserDetails };

// References 
// Chaitanya, A., 2023.Salting and Hashing Passwords with bcrypt.js: A Comprehensive Guide. [online] Available at: <Salting and Hashing Passwords with bcrypt.js: A Comprehensive Guide | by Arun Chaitanya | Medium> [Accessed 2 October 2025].
// The Debug Arena,2025.Access and Refresh Token in Backend || Token Authentication in React & Node.[video online] Available at: <https://www.youtube.com/watch?v=FjuAn-y_zWk> [Accessed 18 October 2025].
