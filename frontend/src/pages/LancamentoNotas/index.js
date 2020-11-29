import React from 'react';
import './styles.css';
import {
    Container, Row, Col,
    Form 
} from "react-bootstrap"

export default function LancamentoNotas(){
    return(
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
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}