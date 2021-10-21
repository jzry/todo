import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//user Navigation
function UserNavi()
{
    const doLogout = event =>
    {
        event.preventDefault();

        alert('doLogout');
        window.location.href = "/";
    };

    return(
        <div className='navi'>
            <Navbar id="dashBar" className="toDoBar" variant="light" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href='/'>todo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/canvas'>New &#43;</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button type="button" id="logoutButton" className="navBtn" onClick={doLogout}> Log Out </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default UserNavi;