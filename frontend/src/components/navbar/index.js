import React from 'react';
import './styles.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function navbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home">SisAdmin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <NavDropdown title="Fornecedores" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Adicionar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Pesquisar</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navbar;