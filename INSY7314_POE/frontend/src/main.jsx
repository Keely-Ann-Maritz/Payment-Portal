// Required imports 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css'
import './index.css'
import App from './App.jsx'

//importing bootstrap into all pages
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* exposing auth context to the rest of the app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
