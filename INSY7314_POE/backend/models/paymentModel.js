const mongoose = require('mongoose');

// first, we need to create a schema, which is like a template for our object 
// Added a status field which is assigned to pending as default (Maske, 2020)
const paymentSchema = new mongoose.Schema({
    paymentTitle: String,
    currency: String,
    provider: String,
    amount: Number,
    swiftCode: String,
    name: String,
    cardNumber: String,
    month: Number,
    year: Number,
    cvc: String,
    status: {
        type: String,
        default: 'pending'
    },
    username: String
});

// we then define that the object references that schema, and give it a name
const Payment = mongoose.model('Payment', paymentSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Payment;

// References
// Maske, S., 2020. In Mongo-DB How to set Default Value for a field through node restify. [online] Available at: <node.js - In Mongo-DB How to set Default Value for a field through node restify? - Stack Overflow> [Accessed 2 October 2025].