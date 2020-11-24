import React, { useState, useEffect } from "react"
import "./styles.css"
import api from '../../services/api';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import InputMask from "react-input-mask";
import {
    Container, Row, Col,
    Form, Button
} from "react-bootstrap"

function AddFornecedor(props) {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    //validações
    const [cnpjIsValid, setCnpjIsValid] = useState(false);

    function setNameValue(evt) {
        setName(evt.target.value)
    }
    function setCnpjValue(evt) {
        let formatted = cnpjValidator.format(evt.target.value);
        setCnpjIsValid(cnpjValidator.isValid(formatted));
        setCnpj(formatted);
        console.log(cnpjIsValid)
    }
    function setTelefoneValue(evt) {
        setTelefone(evt.target.value)
    }
    function setEnderecoValue(evt) {
        setEndereco(evt.target.value)
    }

    function enviarFormulario() {
        api.get('/fornecedores', {
            name: name,
            cnpj: cnpj,
            telefone: telefone,
            endereco: endereco
        })
    }

    useEffect(() => {
        if (props.id) {
            console.log('props.id=' + props.id)
        }
    }, [props.id])

    return (
        <Container>
                <Row>
                    <p>{name}</p>
                    <p>{cnpj}</p>
                    <p>{telefone}</p>
                    <p>{endereco}</p>
                    <p>cnpj is {cnpjIsValid + ','+cnpj.length}</p>
                </Row>
            <Row>
                <Col>
                    <h3>Adicionar Forncedor</h3>
                </Col>
            </Row>
            <Row>
                <Form method="POST" action="/api/fornecedores">
                    <Form.Group controlId="formName">
                        <Form.Label>Nome*</Form.Label>
                        <Form.Control type="text" placeholder="Nome da empresa" required
                            value={name} onChange={setNameValue}></Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group controlId="formCnpj">
                            <Form.Label>CNPJ*</Form.Label>
                            <Form.Control type="text" maxLength={18} placeholder="00.000.000/0001-00" required
                                value={cnpj} onChange={setCnpjValue}></Form.Control>
                            <Form.Text className="text-muted" id="cnpjMsg" 
                            hidden={cnpj.length > 17 && cnpjIsValid === true ? true:false }>CNPJ Invalido!</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <InputMask mask="(99)99999-9999" placeholder="(00)00000-0000" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formEndereco">
                        <Form.Label >Endereco*</Form.Label>
                        <Form.Control type="text" maxLength={256} placeholder="Endereco da empresa" required
                            value={endereco} onChange={setEnderecoValue}></Form.Control>
                    </Form.Group>
                    <Button variant="light" type="button"><a href="/" id="txtVoltar">Voltar</a></Button>
                    <Button variant="primary" type="submit">Salvar</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default AddFornecedor;