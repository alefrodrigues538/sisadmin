import React from "react"
import "./styles.css"
import {
    Container, Row, Col,
    Form, Button, Card, Table
} from "react-bootstrap"

export default function Fornecedores() {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Fornecedores</h3>
                </Col>
            </Row>
            <Row>
                <Card>
                    <Form inline>
                        <Form.Row>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="Text" placeholder="Digite um nome"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formCnpj" >
                                <Form.Label>CNPJ:</Form.Label>
                                <Form.Control type="Text" width="100px" maxLength={18} placeholder="00.000.000/0001-00"></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">Buscar</Button>
                        <Button variant="dark" type="button">Adicionar Fornecedor</Button>
                    </Form>
                </Card>
            </Row>
            <Row>
                <Col>
                    <Table responsive striped hover variant="light">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>nome</th>
                                <th>cnpj</th>
                                <th>telefone</th>
                                <th>endereco</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>0</th>
                                <th>Ambev LTDA</th>
                                <th>00.000.000/0001-00</th>
                                <th>(00) 00000-0000</th>
                                <th>R Algum lugar, 1100 - jardim intregracao - franca-sp</th>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}