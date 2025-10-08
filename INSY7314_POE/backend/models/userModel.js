const mongoose = require('mongoose');

// define the blueprint of a user
const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    idnumber: String,
    accountnumber: String,
    password: String
});

// link it to the database
const User = mongoose.model('User', userSchema);

// expose it to the rest of the app
module.exports = User;