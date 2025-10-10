// Importing the navigation bar and navigation (GeeksforGeeks,2025)
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

// Importing authorization (The Debug Arena, 2025)
import { useAuth } from "../context/AuthContext.jsx";


export default function Navigation() {
    // Using the navigation (GeeksforGeeks,2025)
    const navigate = useNavigate()
    // Logging out variable (The Debug Arena, 2025)
    const { logout } = useAuth();

    // Logout method (The Debug Arena, 2025)
    const handleLogout = () => {
        sessionStorage.clear();
        logout()
        navigate('/')
    }

    // Navigation bar (GeeksforGeeks,2025)
    return (
        <Navbar expand='lg' className='navbar-glass' style={{ backgroundColor: '#610595' }}>
            <Container>
                <Navbar.Brand as={Link} to='/' className='text-white fw-bold fs-4'>
                    <span className='text-primary-accent'></span> Payment Portal
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='navbar-nav' className='border-0 text-white' />

                <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
                    <Nav className='me-auto gap-3'>
                        <Nav.Link
                            as={Link}
                            to='/Form'
                            className='text-white hover-text-white transition-colors'
                        >
                            Make Payment
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/paymentHistory'
                            className='text-white hover-text-white transition-colors'
                        >
                            Payment History
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            onClick={handleLogout}
                            className='text-white hover-text-white transition-colors'
                        >
                            Logout
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
