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
                        <Nav.Link href="/home">Inicio</Nav.Link>
                        <NavDropdown title="Fornecedores" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/fornecedores">Pesquisar</NavDropdown.Item>
                            <NavDropdown.Item href="/fornecedores/add">Adicionar</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navbar;