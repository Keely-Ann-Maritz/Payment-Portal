// calling in AuthContext so we can use the LOGIN method
import { useAuth } from "../context/AuthContext.jsx";
// calling in Navigate so we can redirect the user to the dashboard
import { Navigate, useNavigate } from "react-router-dom";
//import styling packages
//this one particular
import { useState, useEffect } from 'react'
import { useLayoutEffect } from 'react'

import {
  LoginUser
} from "../services/apiService.js";

// every page needs to return a default function, so that it can be called elsewhere
// Hiding navigation bar (sahilatahar, 2023)
export default function Login({ setShowNavbar }) {
  // this formData is for CREATING A NEW PAYMENT
  const [formData, setFormData] = useState({
    username: "",
    accountnumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    loginError: "",
    username: "",
    accountnumber: "",
    password: "",
  })

  // Hiding the navigation bar for this page (sahilatahar, 2023)
  useLayoutEffect(() => {
    setShowNavbar(false);
  }, [])

  // this method will handle what to do when user input happens in our form element
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // call in our login method
  const { login } = useAuth();
  // set up for navigation
  const navigate = useNavigate();

  // then in our method to handle a new login...
  const handleLogin = () => {
    // .. we login
    login();
    // and go where we need to go
    navigate("/form");
  };

  const goToRegister = () => {

    // and go where we need to go
    navigate("/register");
  };

  // this method handles what happens when the submit button is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preventing against SQL Injection (GeeksforGeeks, 2025)
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let regexUsername = /^[a-zA-Z][a-zA-Z0-9_]{3,}$/;
    let regexAccountNum = /^\d{8,}$/;

    
    let usernameChecked = true;;
    let passwordChecked = true;
    let errors = {};

    // for Username
    if (!regexUsername.test(formData.username)) {
      errors.accountnumber = "User details incorrect";
      usernameChecked = false;
    }
    else {
      errors.accountnumber = "";
    }

    if (!regexPassword.test(formData.password)) {
      errors.password = "User details incorrect";
      passwordChecked = false;
    }
    else {
      errors.password = "";
    }

    if (passwordChecked && usernameChecked) {
      try {
        const checkLogin = await LoginUser(formData);
        console.log("LoginUser response:", checkLogin);

        // (The Debug Arena, 2024)
        if (checkLogin && checkLogin.token) {
          const token = checkLogin.token;
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("username", formData.username);

          alert("User Logged in!");
          setFormData({ username: "", accountnumber: "", password: "" });
          handleLogin()
        } else {

          errors.loginError = "Backend Error";

        }
      } 
      // (The Debug Arena, 2025)
      catch (error) {
        if (error.response.status == 429) {
          errors.loginError = error.response.data.message || "Too many attempts! Try again in 5 minutes";
        } else {
          errors.loginError = error.response.data.message || "User details is incorrect!";

        }
      }
    }
    // calling the errors
    setFormErrors(errors);
  };

  // Login form (Hallale,2024)
  return (
    <div className=" backgroundImage bg-light d-flex align-items-center justify-content-center vh-100  " >
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3">Login</h1>
            <p className="card-text text-muted">Login below to access your account</p>
          </div>
          <div className="mt-4">
            <form formErrors onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="text-danger mt-1 small">{formErrors.loginError}</div>
                <div className="text-danger mt-1 small">{formErrors.username}</div>
                <div className="text-danger mt-1 small">{formErrors.accountnumber}</div>
                <div className="text-danger mt-1 small">{formErrors.password}</div>
                <label type="text" className="form-label text-muted">Username</label>
                <input type="text" name="username" placeholder="John87" value={formData.username} onChange={handleInputChange} required className="form-control" />
              </div>
              <div className="mb-4">
                <label htmlFor="accountnumber" className="form-label text-muted">Account Number</label>
                <input className="form-control" type='number' name="accountnumber" min="0" placeholder="34783479" value={formData.accountnumber} onChange={handleInputChange} required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">Password</label>
                <input type='password' name="password" placeholder="********" value={formData.password} onChange={handleInputChange} required className="form-control" />
              </div>
              <div className="d-grid">
                <button type="submit" style={{ backgroundColor: '#610595' }} className="btn btn-dark btn-lg">Login</button>
              </div>
              <p className="text-center text-muted mt-4">Don't have an account yet?
                <a onClick={goToRegister} className="text-decoration-none"> Register</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// References
// The Debug Arena, 2025.Login Authentication using JWT token in React JS, Node JS and Mongo DB || MERN stack. [video online] Available at: <https://www.youtube.com/watch?v=yc5eQevcLso&t=1224s> [Accessed 22 September 2025].
// Hallale,P.,2024.Sign in form with bootstrap 5. [online] Available at: <https://bootstrapexamples.com/@prajwal/sign-in-form-with-bootstrap-5> [Accessed 19 September 2025].
// GeeksforGeeks, 2025.JavaScript - How to Validate Form Using Regular Expression. [online] Available at: <https://www.geeksforgeeks.org/javascript/how-to-validate-form-using-regular-expression-in-javascript/> [Accessed 3 October 2025].
// The Debug Arena, 2024.Login in React using JWT token in Node js || Login and Register Authentication React JS. [video online]. Available at: <https://www.youtube.com/watch?v=B8FyLzNA2uk&t=647s> [Accessed 9 October 2025].
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
