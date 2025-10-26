//importing bcrypt package to hash the passsword and account number
const bcrypt = require('bcryptjs');
// importing the json web token package since we are creating a token to generate a token upon login
const jwt = require('jsonwebtoken');
const { invalidateToken } = require('../middlewares/authMiddleware.js');
const adminUser = require('../models/adminUserModel.js');
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

const getUserDetails = async (req, res) => {
    try {
        const user = await adminUser.findOne({ username: req.user.username });
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
};


const register = async (req, res) => {
    // request the required register information from the incoming register request
    const { username, password, fullname, idnumber } = req.body;
    // before signing the user up, we need to check if their username is already in use
    const exists = await adminUser.findOne({ username: username })
    // if it is, sent a error status 400 informting the user that the username has been taken
    if (exists) return res.status(400).json({ message: "User already exists." });
    // if not, lets hash their password (by providing their password, and the number of random iterations to salt) (Chaitanya, 2023)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // method that stores the uesr registeration details in the database
        await adminUser.create({ username: username, password: hashedPassword, fullname: fullname, idnumber, admin: false });
        res.status(200).json({ success: true, token: generateJwt(username) });

    } catch (e) {
        //if user doesnt store , return teh error message
        res.status(500).json({ error: e.message });
    } res.status(500).json({ error: e.message });


};

const login = async (req, res) => {
    //requesting the login details
    const { username, password } = req.body;
    //Finding the username that matches one in the database
    const exists = await adminUser.findOne({ username: username })

    // if the user is not present in our collection, let them know to try again
    if (!exists) return res.status(400).json({ message: "Invalid credentials." });


    // next, if the user DOES exist, we compare their entered account number and password to what we have hashed in mongo db  (Chaitanya, 2023)
    const matchingPassword = await bcrypt.compare(password, exists.password);

    // if if the password or account number doesnt match, inform the user with a message under the status code 400
    if (!matchingPassword) return res.status(400).json({ message: "Invalid credentials." });

    // if credentials do match, generate and send a JWT token generated from the username, to the front end 
    const token = generateJwt(username);
    const role = exists.admin;

    // Token with HTTPOnly (The Debug Arena,2025)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Logged in successfully!", token, role });
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

const getEmployees = async (req, res) => {
    try {
        // create a new variable to hold the result of our query
        // by saying .find({}), we are sending a query with no parameters to filter the results,
        // meaning that the database will return ALL items in the collection (so every payment in this case)
        const employees = await adminUser.find({ admin: false });
        // return the payments
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: delete a payment from the database
const deleteEmployee = async (req, res) => {
    // we pass the id of the payment we want to remove
    const id = req.params.id;

    // checking to see if an ID was sent to the backend
    if (!id) {
        res.status(400).json({ message: "Please provide an ID to delete." });
    }

    // first try find the payment
    try {
        var employee = await adminUser.findById(id);

        // if no payment is found, 404 and exit the method
        if (!employee) {
            res.status(404).json({ message: "No payment found that matches that ID." });
        }

        // find the payment, delete it, and return what it was
        employee = await adminUser.findByIdAndDelete(id);
        res.status(202).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { register, login, logout, getEmployees, deleteEmployee, getUserDetails };
