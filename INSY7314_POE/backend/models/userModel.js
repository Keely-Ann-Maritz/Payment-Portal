const mongoose = require('mongoose');

// define the user schema for registering a user as well as being used for the login of a user
const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    idnumber: String,
    accountnumber: String,
    password: String
});

// link the user to the database
const User = mongoose.model('User', userSchema);

// expose it to the rest of the app
module.exports = User;