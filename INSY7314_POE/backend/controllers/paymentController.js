// call in our model, so that we can use it in our methods
const Payment = require("../models/paymentModel.js");
//call bcrypt for hashing the card number and cvv
const bcrypt = require('bcryptjs');
require('dotenv').config();



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

// GET: a single payment
const getPayment = async (req, res) => {
  // get the id of the book that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the payment using the provided ID
    const payment = await Payment.findById(id);

    // if no payment is found matching the provided ID, we should return 404 with an informative message
    if (!payment) {
      res.status(404).json({ message: "No payment found that matches that ID." });
    }

    // otherwise, return the payment
    res.status(200).json(payment);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};

// POST: create a new payment
const createPayment = async (req, res) => {
  // from the request sent by the browser/frontend application, look in the body for the required fields
  const { paymentTitle, currency, provider, amount, swiftCode, name, cardNumber, month, year, cvc } = req.body;

  // checked that all information is provided
  if (!paymentTitle || !currency || !provider || !amount || !swiftCode || !name || !cardNumber || !month || !year || !cvc) {
    res
      .status(400)
      .json({ message: "Please ensure that all fields are provided." });
  }

  try {
    //salting and hashing the card number

    const cardNumSalt = await bcrypt.genSalt(10);
    const hashedCardNumber = await bcrypt.hash(cardNumber.toString(), cardNumSalt);

    //salting and hashing the CVV
    const cvcSalt = await bcrypt.genSalt(10);

    const hashedCVV = await bcrypt.hash(cvc.toString(), cvcSalt);

    // create a new payment instance using the information provided to us
    const payment = await Payment.create({ paymentTitle, currency, provider, amount, swiftCode, name, cardNumber: hashedCardNumber, month, year, cvc: hashedCVV });
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

    // if no book, inform the user and don't proceed any further
    if (!payment) {
      res.status(404).json({ message: "No payment found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version (post update) is returned, rather than the old book
    payment = await Payment.findByIdAndUpdate(
      id,
      { paymentTitle, currency, provider, amount, swiftCode, name, cardNumber, month, year, cvc },
      { new: true }
    );
    // spit it out encoded in json
    res.status(202).json(payment);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// DELETE: nuke a payment from existence
const deletePayment = async (req, res) => {
  // get the id of the payment we want to remove
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the payment
  try {
    var payment = await Payment.findById(id);

    // if no payment, 404 and exit the method
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
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
