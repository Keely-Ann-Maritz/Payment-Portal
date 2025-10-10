const mongoose = require('mongoose');

// We create a mongoose schema that will be a map of all the details for a payment and their datatype, and helps against NoSQL injection
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

// we then define that the object references the payment schema
const Payment = mongoose.model('Payment', paymentSchema);

// finally we export our payment model object, so that we can reference it in other files
module.exports = Payment;

// References
// Maske, S., 2020. In Mongo-DB How to set Default Value for a field through node restify. [online] Available at: <node.js - In Mongo-DB How to set Default Value for a field through node restify? - Stack Overflow> [Accessed 2 October 2025].