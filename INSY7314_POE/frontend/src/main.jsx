import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// importing our auth handler
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* exposing auth context to the rest of the app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)