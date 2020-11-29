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
                        <NavDropdown title="Produtos" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/produtos">Pesquisar</NavDropdown.Item>
                            <NavDropdown.Item href="/produtos/add">Adicionar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Fornecedores" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/fornecedores">Pesquisar</NavDropdown.Item>
                            <NavDropdown.Item href="/fornecedores/add">Adicionar</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Notas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/notas">Pesquisar</NavDropdown.Item>
                            <NavDropdown.Item href="/notas/lancamento">Lançamento de notas</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navbar;