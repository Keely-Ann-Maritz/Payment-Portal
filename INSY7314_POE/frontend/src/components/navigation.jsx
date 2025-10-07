import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

export default function Navigation() {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem('token')

    if (['/login', '/register'].includes(location.pathname)) return null

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Navbar expand='lg' className='navbar-glass fixed-top '>
            <Container>
                <Navbar.Brand as={Link} to='/' className='text-white fw-bold fs-4'>
                    <span className='text-primary-accent'></span> Payment Portal
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='main-nav' className='border-0 text-white' />

                <Navbar.Collapse id='main-nav' className='justify-content-end'>
                    {isLoggedIn && (
                        <Nav className='me-auto gap-3'>
                            <Nav.Link
                                as={Link}
                                to='/Form.jsx'
                                className='text-white-50 hover-text-white transition-colors'
                            >
                                Make Payment
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to='/paymentHistory.jsx'
                                className='text-white-50 hover-text-white transition-colors'
                            >
                                Payment History
                            </Nav.Link>
                            <Nav.Link
                                onClick={handleLogout}
                                className='text-white-50 hover-text-white transition-colors'
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}