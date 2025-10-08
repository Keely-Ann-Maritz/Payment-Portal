// calling in the required imports to handle routing between multiple pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// call in our pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PaymentForm from './pages/PaymentForm.jsx'
import FormThankYou from './pages/FormThankYou.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PaymentHistory from './pages/paymentHistory.jsx'
import Register from './pages/Register.jsx'

import './App.css'

//import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/paymentHistory" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<ProtectedRoute><PaymentForm /></ProtectedRoute>} />
        <Route path="/formThankYou" element={<ProtectedRoute><FormThankYou /></ProtectedRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App