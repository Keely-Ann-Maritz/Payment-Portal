import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Navigation from './components/Navigation.jsx'
import { useState } from 'react'

// call in our pages
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import ViewEmployees from './pages/ViewEmployees.jsx'
import ViewPendingPayments from './pages/ViewPendingPayments.jsx'


import './App.css'
//routes for all the pages and the navbar, and which needs authentication to be accessed
function App() {
  //const [showNavbar, setShowNavbar] = useState(true);
  return (
    <Router>
      {/* Hiding the navigation bar on specific pages (sahilatahar, 2023) */}
      {/*{showNavbar && <Navigation />}*/}
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ViewEmployees" element={<ProtectedRoute><ViewEmployees /></ProtectedRoute>} />
        <Route path="/ViewPendingPayments" element={<ProtectedRoute><ViewPendingPayments /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

// References
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
