import React, { useState, useEffect } from "react"
import "./styles.css"

import api from '../../services/api';

import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import InputMask from "react-input-mask";
import {
    Container, Row, Col,
    Form, Button, Alert
} from "react-bootstrap"

function AddFornecedor(props) {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    const [search, setSearch] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    const [alertHidden, setAlertHidden] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(true);
    const [alertMSG, setAlertMSG] = useState('Fornecedor Cadastrado com sucesso!');

    //validações
    const [cnpjIsValid, setCnpjIsValid] = useState(undefined);

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

    async function sendForm() {
        if (name.length > 0 &&
            cnpjIsValid === true &&
            telefone.length >= 13) {
            await api.post('/fornecedores', {
                'name': name,
                'cnpj': cnpj,
                'telefone': telefone,
                'endereco': endereco
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res)
                setAlertHidden(false);
                setAlertSuccess(true);
                setAlertMSG(res.data);
            }).catch(function (error) {
                console.log(error.message, error.response)
                setAlertHidden(false);
                setAlertSuccess(false);
                setAlertMSG('Não foi possivel cadastrar este fornecedor!');
            });
        } else {
            console.log('Existem campos invalidos/vazios!!');
        }
    }

    async function updateFornecedor() {
        console.log('aqui')
        await api.put(`/fornecedores/${id}`, {}, {
            headers: {
                'name': name,
                'cnpj': cnpj,
                'telefone': telefone,
                'endereco': endereco
            }
        }).then(function (res) {
            console.log(res.status)
            setAlertHidden(false);
            setAlertSuccess(true);
            setAlertMSG('Fornecedor alterado com sucesso!');
        }).catch(function (error) {
            console.log(error.message, error.response)
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Não foi possivel alterar este fornecedor!');
        });
    }

    function toggle_Alert() {
        setAlertHidden(true);
    }

    async function getFornecedorByCnpj(_cnpj) {
        console.log('_cnpj:' + _cnpj)
        await api.get('/fornecedores', {
            headers: {
                'cnpj': _cnpj,
                'name': ''
            }
        }).then(function (res) {
            console.log(res.data)
            if (res.data.length > 0) {
                setCnpjIsValid(true);

                setId(res.data[0].id);
                setName(res.data[0].name);
                setCnpj(cnpjValidator.format(res.data[0].cnpj));
                setTelefone(res.data[0].telefone);
                setEndereco(res.data[0].endereco);
            } else {
                setAlertHidden(false);
                setAlertSuccess(false);
                setAlertMSG('Fornecedor não encontrado e/ou não existe!');
            }
        }).catch(function (error) {
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Fornecedor não encontrado e/ou não existe!');
        });
    }

    useEffect(() => {
        setName('');
        setCnpj('');
        setTelefone('');
        setEndereco('');

        setSearch(props.location.search.replace('?', ''));
        console.log(search)
        if (search !== '') {
            setIsEdit(true);
            getFornecedorByCnpj(search);
        }
    }, [search])

    return (
        <Container>
            <Row>
                <Col hidden={alertHidden}>
                    <Alert variant={alertSuccess === true ? 'success' : 'danger'}>
                        <Alert.Heading>{alertMSG}
                            <Button variant={alertSuccess === true ? "outline-success" : "outline-danger"} onClick={toggle_Alert}>X</Button>
                        </Alert.Heading>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <p>{name}</p>
                <p>{cnpj}</p>
                <p>{telefone}</p>
                <p>{endereco}</p>
                <p>cnpj is {cnpjIsValid + ',' + cnpj.length}</p>
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
                                value={cnpj} onChange={setCnpjValue} isInvalid={cnpj.length > 0 ? cnpjIsValid === true ? false : true : undefined}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <InputMask mask="(99)99999-9999" placeholder="(00)00000-0000" value={telefone} onChange={setTelefoneValue} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formEndereco">
                        <Form.Label >Endereco*</Form.Label>
                        <Form.Control type="text" maxLength={256} placeholder="Endereco da empresa" required
                            value={endereco} onChange={setEnderecoValue}></Form.Control>
                    </Form.Group>
                    <Button variant="light" type="button"><a href="/fornecedores" id="txtVoltar">Voltar</a></Button>
                    <Button variant="primary" type="button"
                        onClick={isEdit === false ? sendForm : updateFornecedor}>Salvar</Button>
                </Form>
            </Row>
            
        </Container>
    )
}

export default AddFornecedor;