import React from "react"
import "./styles.css"
import {
    Container, Row, Col,
    Form, Button
} from "react-bootstrap"

function addFornecedor() {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Adicionar Forncedor</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label classname="txtLabel">Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome."></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCnpj">
                            <Form.Label classname="txtLabel">CNPJ</Form.Label>
                            <Form.Control type="text" maxLength={18} placeholder="00.000.000/0001-00"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTelefone">
                            <Form.Label classname="txtLabel">Telefone</Form.Label>
                            <Form.Control type="text" maxLength={15} placeholder="(00) 00000-0000"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formEndereco">
                            <Form.Label classname="txtLabel">Endereco</Form.Label>
                            <Form.Control type="text" maxLength={256} placeholder="Endereco"></Form.Control>
                        </Form.Group>
                        <Button variant="light" type="button"><a href="/" id="txtVoltar">Voltar</a></Button>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default addFornecedor;