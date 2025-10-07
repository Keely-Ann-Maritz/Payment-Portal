const mongoose = require('mongoose');

// first, we need to create a schema, which is like a template for our object
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
    }
});

// we then define that the object references that schema, and give it a name
const Payment = mongoose.model('Payment', paymentSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Payment;