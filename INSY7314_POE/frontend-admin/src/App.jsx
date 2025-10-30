import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminNavigation from './components/adminNavigation.jsx'
import EmployeeNavigation from './components/employeeNavigation.jsx'
import { useEffect, useState } from 'react'

// call in our pages
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AddEmployee from './pages/AddEmployee.jsx'
import ViewEmployees from './pages/ViewEmployees.jsx'
import ViewPendingPayments from './pages/ViewPendingPayments.jsx'
import ReviewedPayments from './pages/ReviewedPayments.jsx'
import './App.css'
import { useAuth } from "./context/AuthContext.jsx";

// Routes for all the pages and the navbar, and which needs authentication to be accessed
function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [role, setRole] = useState(null);
  const { login } = useAuth();


  // Retreiving the role from the session and retreiving the authentication token (The Debug Arena, 2024)
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");
    // Checking if the token and role exists and ensuring the user stays logged in if they refresh the page (Krishnam,2024)
    if (storedRole && token) {
      setRole(storedRole);
      //login();
    }
  }, []);

  // Checking if the role is being checked and if it is an admin or employee logging in (Filip, 2024)
  function adminNavbar() {
    if (!showNavbar || !role) return null;
    switch (role) {
      case 'admin':
        return <AdminNavigation role={role} />;
      default:
        return <EmployeeNavigation role={role} />;
    }
  }

  return (
    <Router>
      {/* Hiding the navigation bar on specific pages and setting the role (sahilatahar, 2023) */}
      {adminNavbar()}
      <Routes>
        <Route path="/" element={<AdminLogin setShowNavbar={setShowNavbar} setRole={setRole} />} />
        <Route path="/AdminLogin" element={<AdminLogin setShowNavbar={setShowNavbar} setRole={setRole} />} />
        <Route path="/AddEmployee" element={<ProtectedRoute><AddEmployee setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
        <Route path="/ViewEmployees" element={<ProtectedRoute><ViewEmployees setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
        <Route path="/ViewPendingPayments" element={<ProtectedRoute><ViewPendingPayments setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
        <Route path="/ReviewedPayments" element={<ProtectedRoute><ReviewedPayments setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

// References
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
// The Debug Arena, 2024.Login in React using JWT token in Node js || Login and Register Authentication React JS. [video online]. Available at: <https://www.youtube.com/watch?v=B8FyLzNA2uk&t=647s> [Accessed 9 October 2025].
// Krishnam,2024.Vanilla React Navbar non-reactive upon updating local storage.[online] Available at: <https://stackoverflow.com/questions/78973915/vanilla-react-navbar-non-reactive-upon-updating-local-storage> [Accessed 26 October 2025].
// Filip,2024.React Switch Statement: Guide with Examples.[online] Available at: <https://nulldog.com/react-switch-statement-guide-with-examples> [Accessed 26 October 2025].