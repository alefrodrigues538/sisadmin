import React from 'react';
import './styles.css';
import {
    Container, Row, Col,
    Form, Button, Card, 
} from "react-bootstrap"

export default function Notas(){
    return(
        <Container>
            <Row>
                <Col>
                    <h3>Notas</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Form inline>
                            <Form.Group controlId="formCod">
                                <Form.Label>Codigo da nota:</Form.Label>
                                <Form.Control placeholder="Escaneie ou digite o codigo da nota"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBtn">
                                <Button variant="primary">Buscar</Button>
                                <Button variant="dark"><a id="link-lancamento" href='/notas/lancamento'>Lançamento de notas</a></Button>
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}