const mongoose = require('mongoose');

// define the user schema for registering a user as well as being used for the login of a user
const admnUserSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    idnumber: String,
    accountnumber: String,
    password: String,
    admin: Boolean
});

// link the user to the database
const adminUser = mongoose.model('adminUser', admnUserSchema);

// expose it to the rest of the app
module.exports = adminUser;