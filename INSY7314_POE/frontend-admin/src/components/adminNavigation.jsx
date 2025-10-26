// Importing the navigation bar and navigation (GeeksforGeeks,2025)
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

// Importing authorization (The Debug Arena, 2025)
import { useAuth } from "../context/AuthContext.jsx";

import { Logout } from "../services/apiService.js";


export default function AdminNavigation() {
    // Using the navigation (GeeksforGeeks,2025)
    const navigate = useNavigate()
    // Logging out variable (The Debug Arena, 2025)
    const { logout } = useAuth();

    // Logout method (The Debug Arena, 2025)
    const handleLogout = () => {
        //getLogout()
        sessionStorage.clear();
        Logout()
        logout()
        navigate('/')
    }

    const username = sessionStorage.getItem("adminUsername") || sessionStorage.getItem("EmployeeUsername");


    // Navigation bar which will display on teh payment history page(GeeksforGeeks,2025)
    return (
        <Navbar expand='lg' className='navbar-glass' style={{ backgroundColor: '#610595' }}>
            <Container>
                <Navbar.Brand as={Link} to='/' className='text-white fw-bold fs-4'>
                    <span className='text-primary-accent'></span> Administrator Portal
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='navbar-nav' className='border-0 text-white' />

                <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
                    <Nav className='me-auto gap-3'>
                        <Nav.Link
                            as={Link}
                            to='/AddEmployee'
                            className='text-white hover-text-white transition-colors'
                        >
                            Add Employee
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/ViewEmployees'
                            className='text-white hover-text-white transition-colors'
                        >
                            View Accounts
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            onClick={handleLogout}
                            className='text-white hover-text-white transition-colors'
                        >
                            Logout
                        </Nav.Link>
                        <Nav.Link
                            disabled
                            className='text-white hover-text-white transition-colors'
                        >
                            {username}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

// References
// GeeksforGeeks,2025. How to Make the Navbar Collapse on Smaller Screens in React Bootstrap. [online] Available at: <https://www.geeksforgeeks.org/reactjs/how-to-make-the-navbar-collapse-on-smaller-screens-in-react-bootstrap/> [Accessed 3 October 2025].
// The Debug Arena, 2025.Login Authentication using JWT token in React JS, Node JS and Mongo DB || MERN stack. [video online] Available at: <https://www.youtube.com/watch?v=yc5eQevcLso&t=1224s> [Accessed 22 September 2025].
