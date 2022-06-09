import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <Navbar bg="light" expand="lg" className='py-3'>
            <Container>
                <h4 className='fw-bold'>Drawing App</h4>
                <Nav className="ms-auto my-auto">
                    <NavLink acti className="my-auto mx-2 fw-bold text-decoration-none" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="mx-2 me-4 fw-bold my-auto text-decoration-none" to="/draw?&action=new">Draw</NavLink>
                    <button className="btn btn-danger" onClick={() => {
                        localStorage.clear();
                        window.location.href="";
                    }}>Logout</button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header