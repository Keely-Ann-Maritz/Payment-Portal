// importing required react components (dangelo,2022)
import { useEffect, useState } from "react";
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
 
import {
    getPendingPayments,
    updateStatus
} from "../services/apiService.js";
 
 
// Payment History (sahilatahar, 2023)
export default function ViewPendingPayments({ setShowNavbar }) {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
 
 
    // Displaying the navigation bar on this page (sahilatahar, 2023)
    useLayoutEffect(() => {
        setShowNavbar(true);
    }, [])
 
 
    const fetchPayments = async () => {
        const username = sessionStorage.getItem("username")
        // fetch all payments using the apiService method we created earlier, storing the response in a temp variable
        const res = await getPendingPayments();
        // and update our payments variable with the response data
        setPayments(res.data);
        // navigating to the view pending payments page
        navigate("/ViewPendingPayments");
    };
 
 
    // this method will run as soon as the page is loaded
    useEffect(() => {
        // fetching all of the payments in the background
        fetchPayments();
        // navigating to the view pending payments page
        navigate("/ViewPendingPayments");
    }, []);
 
 
    // we create a method to handle when the delete button is pressed
    const handleDelete = async (id, status) => {
        // prompt the user to make sure that they're sure that they're sure they want to delete
        if (
            window.confirm( "Are you sure you want to update this payment status?")
        ) {
            // if yes, delete the payment using the provided id
            await updateStatus(id, status);
            // and update our cached payments array
            fetchPayments();
            // navigating to the view pending payments page
            navigate("/ViewPendingPayments");
        }
    };
 
 
    // Payment Table
    return (
        <div>
            <h1 className="paymentHistoryHeading">Pending Payments</h1>
            <div className="container mt-3">
                <table border="1" className="table table-hover">
                    {/* thead specifies that the following row will be headings */}
                    <thead className="table-dark">
                        {/* tr denotes a new row */}
                        <tr>
                            {/* and each th represents a heading */}
                            <th>Payee Name</th>
                            <th>Payment Title</th>
                            <th>Provider</th>
                            <th>Currency</th>
                            <th>Swift Code</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* tbody - table body (data lives here) */}
                    <tbody>
                        {/* if there are NO payments, print a message across the table saying so */}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="5">No pending payments available.</td>
                            </tr>
                        )}
                        {/* if there ARE payments, we iterate through each book in the payments array (using temp variable book) 
                            similar to a foreach loop, and we map the correct attribute to the correct column in the table */}
                        {payments.map((payment) => (
                            /* key lets us identify each row */
                                <tr key={payment._id}>
                                <td>{payment.name}</td>
                                <td>{payment.paymentTitle}</td>
                                <td>{payment.provider}</td>
                                <td>{payment.currency}</td>
                                <td>{payment.swiftCode}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.status}</td>
                                <td>
                                    <button
                                        className="btn btn-success "
                                        onClick={() => {
                                            handleDelete(payment._id, "accepted");
                                        }}
                                    >
                                        Accept
                                    </button>
                                </td>
 
                                <td>
                                    <button
                                        className="btn btn-danger "
                                        onClick={() => {
                                            handleDelete(payment._id, "rejected");
                                        }}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
// References
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only&a… [Accessed 4 October 2025].