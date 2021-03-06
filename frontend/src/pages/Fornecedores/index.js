import React, { useState, useEffect } from "react"
import "./styles.css"

import api from '../../services/api';

import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

import {
    Container, Row, Col,
    Form, Button, Card, Table, Alert,
    Modal
} from "react-bootstrap"

export default function Fornecedores() {

    const [tHead, setTHead] = useState([]);
    const [tBody, setTBody] = useState([]);

    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');

    const [alertHidden, setAlertHidden] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(true);
    const [alertMSG, setAlertMSG] = useState('Fornecedor Cadastrado com sucesso!');

    //Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function toggle_Alert() {
        setAlertHidden(true);
    }

    function setNameValue(evt) {
        setName(evt.target.value);
    }
    function setCnpjValue(evt) {
        let formatted = cnpjValidator.format(evt.target.value)
        setCnpj(formatted);
    }

    async function getTableValues() {
        console.log(name+','+ cnpj)
        await api.get('/fornecedores', {
            headers: {
                'Content-Type': 'application/json',
                'name': name,
                'cnpj': cnpj
            }
        }).then(function (res) {
            console.log(res.data);
            setTHead(['#', 'Nome', 'CNPJ', 'Telefone', 'Endereco', 'Ações']);
            setTBody(res.data);

        }).catch(function (error) {
            console.log(error.message, error.response)
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Não foi possivel localizar nenhum fornecedor!');
        });
    }

    function refreshSearch() {
        getTableValues();
    }

    async function deleteRow(_id) {
        await api.delete('/fornecedores/' + _id)
            .then(function (res) {
                console.log(res)
                getTableValues();
                setAlertHidden(false);
                setAlertSuccess(true);
                setAlertMSG('Forncedor deletado com sucesso!');
            }).catch(function (error) {
                console.log(error.message, error.response)
                setAlertHidden(false);
                setAlertSuccess(false);
                setAlertMSG('Não foi possivel deletar o fornecedor!');
            });
        handleClose()
    }

    useEffect(() => {
        getTableValues()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <h3>{name}</h3>
            <h3>{cnpj}</h3>
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
                                <Form.Control type="Text" placeholder="Digite um nome" onChange={setNameValue} value={name}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formCnpj" >
                                <Form.Label>CNPJ:</Form.Label>
                                <Form.Control type="Text" width="100px" maxLength={18} onChange={setCnpjValue} value={cnpj} placeholder="00.000.000/0001-00"></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="button" onClick={refreshSearch}>Buscar</Button>
                        <Button variant="dark" type="button"><a href="/fornecedores/add">Adicionar Fornecedor</a></Button>
                    </Form>
                </Card>
            </Row>
            <Row>
                <Col>
                    <Table responsive striped hover variant="light">
                        <thead>
                            <tr>
                                {
                                    tHead.map(function (el, index) {
                                        return <th key={index}>{el}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tBody.map(function (el,index) {
                                    return (
                                        <tr key={index}>
                                            <th>{el.id}</th>
                                            <th>{el.name}</th>
                                            <th>{el.cnpj}</th>
                                            <th>{el.telefone}</th>
                                            <th className="enderecoTxt">{el.endereco}</th>
                                            <th>
                                                <Form inline>
                                                    <Form.Group>
                                                        <Button variant="outline-secondary"><a href={"/fornecedores/add?" + el.cnpj}>Edit</a></Button>
                                                        <Button variant="outline-danger" onClick={handleShow}>Del</Button>
                                                        <>
                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Atenção</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>Confirme para deletar os dados.</Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={handleClose}>
                                                                        Cancelar
                                                                    </Button>
                                                                    <Button variant="danger" onClick={() => deleteRow(index)}>
                                                                        Deletar
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </>
                                                    </Form.Group>
                                                </Form>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}