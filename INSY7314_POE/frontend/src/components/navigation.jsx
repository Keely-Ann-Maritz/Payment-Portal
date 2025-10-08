import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
 
export default function Navigation() {
    const navigate = useNavigate()
 
    const handleLogout = () => {
        navigate('/')
    }
 
    return (
        <Navbar expand='lg' className='navbar-glass' style={{backgroundColor: '#610595'}}>
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