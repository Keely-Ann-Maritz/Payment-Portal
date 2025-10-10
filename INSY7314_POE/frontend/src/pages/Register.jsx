// calling in Navigate so we can redirect the user to the dashboard
import { Navigate, useNavigate } from "react-router-dom";
// import styling packages
import {
    RegisterUser
} from "../services/apiService.js";

// Hiding navigation bar (sahilatahar, 2023)
import React, { useState } from "react";
import { useLayoutEffect } from 'react'

// Hiding navigation bar (sahilatahar, 2023)
export default function Register({ setShowNavbar }) {
    // this formData is for CREATING A NEW PAYMENT
    const [formData, setFormData] = useState({
        username: "",
        accountnumber: "",
        idnumber: "",
        fullname: "",
        password: "",
    });

    // Hiding navigation bar on this page (sahilatahar, 2023)
    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

    // this method will handle what to do when user input happens in our form element
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // this method handles what happens when the submit button is pressed
    const handleSubmit = async (e) => {

        // prevent the button from being pressed automatically when it is created by React
        e.preventDefault();

        //implementing regex patterns for the different inputs that needs to be met (GeeksforGeeks, 2025)
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let regexIdNumber = /^\d{13}$/;
        let regexUsername = /^[a-zA-Z][a-zA-Z0-9_]{3,}$/;
        let regexAccountNum = /^\d{8,}$/;
        let regexFullname = /^[a-zA-Z\s-]+$/;

        //to see which input has been checked
        let fullnameChecked = true;;
        let usernameChecked = true;;
        let idnumChecked = true;;
        let accountnumChecked = true;;
        let passwordChecked = true;
        let errors = {};

        // for account number 
        if (!regexAccountNum.test(formData.accountnumber)) {
            errors.accountnumber = "Account number must be atleast 8 numbers";
            accountnumChecked = false;
        }
        else {
            errors.accountnumber = "";
        }

        // for Username
        if (!regexUsername.test(formData.username)) {
            errors.username = "Username can only have letters, numbers and underscores";
            usernameChecked = false;
        }
        else {
            errors.username = "";
        }

        // for fullname
        if (!regexFullname.test(formData.fullname)) {
            errors.fullname = "Fullname can only have letters and spaces";
            fullnameChecked = false;
        }
        else {
            errors.fullname = "";
        }

        // for password
        if (!regexPassword.test(formData.password)) {
            errors.password = "Password must be atleast 8 characters long and contain 1 uppercase letter, 1 lowercase  letter and a number with no special characters";
            passwordChecked = false;
        }
        else {
            errors.password = "";
        }
        // for ID number
        if (!regexIdNumber.test(formData.idnumber)) {
            errors.idnumber = "ID number must be 13 numbers";
            idnumChecked = false;
        }
        else {
            errors.idnumber = "";
        }

        // call our API method after we have checked that all inputs meet their regex pattern, and then to create a new payments
        if (passwordChecked && idnumChecked && usernameChecked && fullnameChecked && accountnumChecked) {
            try {
                const checkRegister = await RegisterUser(formData);
                // let the user know if it was successful
                alert("User Created!");
                // and reset the form
                setFormData({ fullname: "", username: "", idnumber: "", accountnumber: "", password: "" });
                // navigate to Login Screen
                handleRegister()
            } catch (error) {
                if (error.response.status == 500) {
                    errors.fullname = error.response.data.message || "User details couldn't store";
                }
            }
        }
        setFormErrors(errors);
    };

    // set up for navigation
    const navigate = useNavigate();

    // then in our method we navigate to the login
    const handleRegister = () => {
        navigate("/Login");
    };
    //registration errors variables
    const [formErrors, setFormErrors] = useState({
        username: "",
        accountnumber: "",
        password: "",
        fullname: "",
        idnumber: ""
    })

    // Register Form (Hallale, 2024)
    return (
        <div className=" backgroundImage  bg-light d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title h3">Register</h1>
                        <p className="card-text text-muted">Register below to create your account</p>
                    </div>
                    <div className="mt-4">
                        <form formErrors onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label type="text" className="form-label text-muted">Full Name</label>
                                <input type="text" name="fullname" placeholder="John Doe" value={formData.fullname} onChange={handleInputChange} required className="form-control" />
                                <div className="text-danger mt-1 small">{formErrors.fullname}</div>

                            </div>
                            <div className="mb-4">
                                <label type="text" className="form-label text-muted">Username</label>
                                <input type="text" name="username" placeholder="John87" value={formData.username} onChange={handleInputChange} required className="form-control" />
                                <div className="text-danger mt-1 small">{formErrors.username}</div>

                            </div>
                            <div className="mb-4">
                                <label htmlFor="accountnumber" className="form-label text-muted">Account Number</label>
                                <input className="form-control" type='number' name="accountnumber" placeholder="34783479" min="0" value={formData.accountnumber} onChange={handleInputChange} required />
                                <div className="text-danger mt-1 small">{formErrors.accountnumber}</div>

                            </div>
                            <div className="mb-4">
                                <label htmlFor="accountnumber" className="form-label text-muted">ID Number</label>
                                <input className="form-control" type='number' name="idnumber" placeholder="4873493850938" min="0" value={formData.idnumber} onChange={handleInputChange} required />
                                <div className="text-danger mt-1 small">{formErrors.idnumber}</div>

                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input type='password' name="password" placeholder="********" value={formData.password} onChange={handleInputChange} required className="form-control" />
                                <div className="text-danger mt-1 small">{formErrors.password}</div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" style={{ backgroundColor: '#610595' }} className="btn btn-dark btn-lg">Register</button>
                            </div>
                            <p className="text-center text-muted mt-4">Don't have an account yet?
                                <a onClick={handleRegister} className="text-decoration-none"> Login</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}

// References 
// GeeksforGeeks, 2025.JavaScript - How to Validate Form Using Regular Expression. [online] Available at: <https://www.geeksforgeeks.org/javascript/how-to-validate-form-using-regular-expression-in-javascript/> [Accessed 3 October 2025].
// Hallale, P., 2024.Sign in form with bootstrap 5. [online] Available at: <https://bootstrapexamples.com/@prajwal/sign-in-form-with-bootstrap-5> [Accessed 19 September 2025].