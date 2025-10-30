// calling in the required imports to handle routing between multiple pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation.jsx'
import { useState } from 'react'

// call in our pages
import Login from './pages/Login.jsx'
import PaymentForm from './pages/PaymentForm.jsx'
import FormThankYou from './pages/FormThankYou.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PaymentHistory from './pages/paymentHistory.jsx'
import Register from './pages/Register.jsx'

import './App.css'
//routes for all the pages and the navbar, and which needs authentication to be accessed
function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <Router>
      {/* Hiding the navigation bar on specific pages (sahilatahar, 2023) */}
      {showNavbar && <Navigation />}
      <Routes>
        <Route path="/" element={<Login setShowNavbar={setShowNavbar} />} />
        <Route path="/login" element={<Login setShowNavbar={setShowNavbar} />} />
        <Route path="/register" element={<Register setShowNavbar={setShowNavbar} />} />
        <Route path="/PaymentHistory" element={<ProtectedRoute><PaymentHistory setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
        <Route path="/form" element={<ProtectedRoute><PaymentForm setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
        <Route path="/formThankYou" element={<ProtectedRoute><FormThankYou setShowNavbar={setShowNavbar} /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

// References
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
