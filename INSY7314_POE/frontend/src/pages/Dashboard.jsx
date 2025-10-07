// importing required react components
import { useEffect, useState } from "react";
// as well as our API methods we created
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/apiService.js";

// every page needs to return a default function, so that it can be called elsewhere
export default function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  // this formData is for CREATING A NEW PAYMENT
  const [formData, setFormData] = useState({
    paymentTitle: "",
    currency: "",
    provider: "",
    amount: 0,
  });
  // this form data is for UPDATING AN EXISTING BOOK
  const [updateData, setUpdateData] = useState({
    paymentTitle: "",
    currency: "",
    provider: "",
    amount: 0,
  });

  const fetchPayments = async () => {
    // fetch all payments using the apiService method we created earlier, storing the response in a temp variable
    const res = await getAllPayments();
    // and update our payments variable with the response data
    setPayments(res.data);
  };

  // this method will run as soon as the page is loaded
  useEffect(() => {
    // fetching all of the payments in the background
    fetchPayments();
  }, []);

  // we create a method to handle when the delete button is pressed
  const handleDelete = async (id) => {
    // prompt the user to make sure that they're sure that they're sure they want to delete
    if (
      window.confirm(
        "Are you sure you want to delete this payment?"
      )
    ) {
      // if yes, delete the payment using the provided id
      await deletePayment(id);
      // and update our cached payments array
      fetchPayments();
    }
  };

  // this method will handle what to do when user input happens in our form element
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // same method, different variable
    const handleUpdateInputChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // this method handles what happens when the submit button is pressed
  const handleSubmit = async (e) => {
    // prevent the button from being pressed automatically when it is created by React
    e.preventDefault();
    // call our wonderful API method to create a new payments
    await createPayment(formData);
    // let the user know if it was successful
    alert("Payment created!");
    // and reset the form
    setFormData({ paymentTitle: "", currency: "", provider: "", amount: 0 });
    // refresh our local list of payments
    fetchPayments();
  };

  // when the reset button is clicked, clear
  const handleReset = () => {
    setFormData({ paymentTitle: "", currency: "", provider: "", amount: 0 });
  };

  // handle what to do when a new item is selected from the select list
  const handleSelectItem = async (e) => {
    // get the .value from the select list option that was chosen
    const _id = e.target.value;
    // update our variable keeping track of the selected payments
    setSelectedPaymentId(_id);
    // if working with a REAL payments (and not the placeholder), do the following...
    if (_id) {
      // ... get the payments from the API using the provided _id
      const res = await getPaymentById(_id);
      setUpdateData(res.data);
    } else {
      setUpdateData({ paymentTitle: "", currency: "", provider: "", amount: 0 });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePayment(selectedPaymentId, updateData);
    alert('Payment updated!')
    fetchPayments();
  }

  return (
    <div>
      <h1>Payment Dashboard Page</h1>
      <div>
        <h3>ALL Payments</h3>
        <table border="1">
          {/* thead specifies that the following row will be headings */}
          <thead>
            {/* tr denotes a new row */}
            <tr>
              {/* and each th represents a heading */}
              <th>Payment Title</th>
              <th>Currency</th>
              <th>Provider</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* tbody - table body (data lives here) */}
          <tbody>
            {/* if there are NO payments, print a message across the table saying so */}
            {payments.length === 0 && (
              <tr>
                <td colSpan="5">No payments available.</td>
              </tr>
            )}
            {/* if there ARE payments, we iterate through each payment in the payments array (using temp variable book) 
            similar to a foreach loop, and we map the correct attribute to the correct column in the table */}
            {payments.map((payment) => (
              /* key lets us identify each row (by the books id, useful for when we implement DELETE later) */
              <tr key={payment._id}>
                <td>{payment.paymentTitle}</td>
                <td>{payment.currency}</td>
                <td>{payment.provider}</td>
                <td>{payment.amount}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(payment._id);
                    }}
                  >
                    Delete Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Make A Payment</h3>
        {/* a FORM element allows us to collect multiple pieces of information about the same thing */}
        <form onSubmit={handleSubmit}>
          {/* we use the INPUT element to gather input */}
          <input
            type="text"
            name="paymentTitle"
            placeholder="Payment Title"
            value={formData.paymentTitle}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="provider"
            placeholder="Provider"
            value={formData.provider}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div>
        <h3>Single Payments</h3>
        <label>Select which Payment You'd Like to Update</label>
        <br />
        <select value={selectedPaymentId} onChange={handleSelectItem}>
          {/* we create a default select list option for when a book has not yet been chosen */}
          <option value="">--Select Payment--</option>
          {/* here, we iterate through each payment in our list, to create a new select list option */}
          {payments.map((payment) => (
            /* we use the _id to reference a payment (in the API), but the title for the user to select 
                as the user will know the title of the payment they want, not the _id */
            <option key={payment._id} value={payment._id}>
              {payment.paymentTitle}
            </option>
          ))}
        </select>
        <br />
        <form onSubmit={handleUpdate}>
          {/* we use the INPUT element to gather input */}
          <input
            type="text"
            name="paymentTitle"
            placeholder="Payment Title"
            value={updateData.paymentTitle}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
           <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={updateData.currency}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
           <input
            type="text"
            name="provider"
            placeholder="Provider"
            value={updateData.provider}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
           <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={updateData.amount}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
          <button type="submit">Update Payment</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
