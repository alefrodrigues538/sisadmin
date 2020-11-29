import React from 'react';
import './styles.css';
import {
    Container, Row, Col,
    Form
} from "react-bootstrap"

export default function LancamentoNotas(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Lançamento de notas</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Barcode nota</Form.Label>
                            <Form.Control placeholder="Escaneie ou digite o codigo da nota"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formProduto">
                            <Form.Label>Pesquisar produto</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}