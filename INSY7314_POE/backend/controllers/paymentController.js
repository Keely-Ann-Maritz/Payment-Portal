// call in our model, so that we can use it in our methods
const Payment = require("../models/paymentModel.js");

// calling DOMPurify (Das, 2025)
const creatingDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// call bcrypt for hashing the card number and cvv/cvc (Chaitanya, 2023)
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Creating a window for DOMPurify (Das, 2025)
const window = new JSDOM('').window;
const DOMPurify = creatingDOMPurify(window);

// GET: all payments
const getPayments = async (req, res) => {
  try {
    // create a new variable to hold the result of our query
    // by saying .find({}), we are sending a query with no parameters to filter the results,
    // meaning that the database will return ALL items in the collection (so every payment in this case)
    const payments = await Payment.find({});
    // return the payments
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: payments for a specific username
const getPaymentByUsername = async (req, res) => {
  // get the username of the payment that the user is looking for, from the parameters
  const username = req.params.username;

  // if the username doesn't exist, inform the user
  if (!username) {
    res.status(400).json({ message: "Please provide a username to search for!" });
  }

  try {
    // try find the payments related to that user, using the provided username
    const payment = await Payment.find({username});

    // if no payment is found matching the provided username, it would mean that they havent added any payments on their account yet
    if (!payment) {
      res.status(404).json({ message: "No payment found that matches that username." });
    }

    // if there is paynments created by them, return all of them to the frontend to display to the logged in user
    res.status(200).json(payment);
  } catch (error) {
    // throws a server error there is an issue getting the payments of teh user
    res.status(500).json({ error: error.message });
  }
};

// POST: create a new payment
const createPayment = async (req, res) => {
  // from the request sent by the browser/frontend application, look in the body for the required fields
  const { paymentTitle, currency, provider, amount, swiftCode, name, cardNumber, month, year, cvc, username } = req.body;

  // checked that all information is provided
  if (!paymentTitle || !currency || !provider || !amount || !swiftCode || !name || !cardNumber || !month || !year || !cvc) {
     res
      .status(400)
      .json({ message: "Please ensure that all fields are provided." });
  }

  try {
    // sanitzing the input fields to protect against XSS attacks (Das, 2025)
    const sanitizedPaymentTitle = DOMPurify.sanitize(paymentTitle)
    const sanitizedSwiftCode= DOMPurify.sanitize(swiftCode)
    const sanitizedName = DOMPurify.sanitize(name)

    // salting and hashing the card number (Chaitanya, 2023)
    const cardNumSalt = await bcrypt.genSalt(10);
    const hashedCardNumber = await bcrypt.hash(cardNumber.toString(), cardNumSalt);

    // salting and hashing the CVC/CVV (Chaitanya, 2023)
    const cvcSalt = await bcrypt.genSalt(10);

    const hashedCVV = await bcrypt.hash(cvc.toString(), cvcSalt);

    // create a new payment instance using the information provided to us (Chaitanya, 2023)
    // using the DOMPurify sanitized variables (Das, 2025)
    const payment = await Payment.create({ paymentTitle: sanitizedPaymentTitle, currency, provider, amount, swiftCode: sanitizedSwiftCode, name: sanitizedName, cardNumber: hashedCardNumber, month, year, cvc: hashedCVV, username });
    // and return code 201 (created), alongside the object we just added to the database
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: update an existing payment
const updatePayment = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { paymentTitle, currency, provider, amount, swiftCode, name, cardNumber, month, year, cvc } = req.body;

  try {
    // firstly find the payment we need to update
    const payment = await Payment.findById(id);

    // if no payment ID is given, inform the user and don't proceed any further
    if (!payment) {
      res.status(404).json({ message: "No payment found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version of teh payment (post update) is returned, rather than the old payment
    payment = await Payment.findByIdAndUpdate(
      id,
      { paymentTitle, currency, provider, amount, swiftCode, name, cardNumber, month, year, cvc },
      { new: true }
    );
    // return success status 200 upon the payment successfully updating
    res.status(202).json(payment);
  } catch (error) {
    // if it doesnt update we inform the frontend user
    res.status(500).json({ error: error.message });
  }
};

// DELETE: delete a payment from the database
const deletePayment = async (req, res) => {
  // we pass the id of the payment we want to remove
  const id = req.params.id;

  // checking to see if an ID was sent to the backend
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the payment
  try {
    var payment = await Payment.findById(id);

    // if no payment is found, 404 and exit the method
    if (!payment) {
      res.status(404).json({ message: "No payment found that matches that ID." });
    }

    // find the payment, delete it, and return what it was
    payment = await Payment.findByIdAndDelete(id);
    res.status(202).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPayments,
  getPaymentByUsername,
  createPayment,
  updatePayment,
  deletePayment,
};

// References 
// Chaitanya, A., 2023.Salting and Hashing Passwords with bcrypt.js: A Comprehensive Guide. [online] Available at: <Salting and Hashing Passwords with bcrypt.js: A Comprehensive Guide | by Arun Chaitanya | Medium> [Accessed 2 October 2025].
// Das, A.,2025.7 Best Practices for Sanitizing Input in Node.js. [online] Available at: < https://medium.com/devmap/7-best-practices-for-sanitizing-input-in-node-js-e61638440096> [Accessed 6 October 2025].

