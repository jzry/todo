import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// guest Navbar, need one for users after login
function Navigation()
{
    return(
        <div className='navi'>
            <Navbar className="toDoBar"variant="dark" collapseOnSelect expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href='/'>todo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/product'>Product</Nav.Link>
                            <Nav.Link href='/'>Company</Nav.Link>
                            <Nav.Link href='/'>Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button href="/login" className="navBtn">Sign In</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default Navigation;