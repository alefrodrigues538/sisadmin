import React, { useState, useEffect } from "react"
import "./styles.css"

import api from '../../services/api';

import {
    Container, Row, Col,
    Form, Button, Alert
} from "react-bootstrap"

function AddProduto(props) {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [search, setSearch] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    const [alertHidden, setAlertHidden] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(true);
    const [alertMSG, setAlertMSG] = useState('Produto Cadastrado com sucesso!');

    function setBarcodeValue(evt) {
        setBarcode(evt.target.value)
    }
    function setNameValue(evt) {
        setName(evt.target.value)
    }
    function setDescriptionValue(evt) {
        setDescription(evt.target.value);
    }

    async function sendForm() {
        if (barcode.length > 0 &&
            name.length > 0) {
            await api.post('/produtos', {
                'barcode': barcode,
                'name': name,
                'description': description
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
                setAlertMSG('Não foi possivel cadastrar este produto!');
            });
        } else {
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Por favor preencha todos os campos (*)!');
        }
    }

    async function updateForm() {
        await api.put(`/produtos/${barcode}`, {}, {
            headers: {
                'barcode': barcode,
                'name': name,
                'description': description,
            }
        }).then(function (res) {
            console.log(res.status)
            setAlertHidden(false);
            setAlertSuccess(true);
            setAlertMSG('Produto alterado com sucesso!');
        }).catch(function (error) {
            console.log(error.message, error.response)
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Não foi possivel alterar este produto!');
        });
    }

    function toggle_Alert() {
        setAlertHidden(true);
    }

    async function handle_Search(_barcode) {
        // console.log('_barcode:' + _barcode)
        await api.get('/produtos', {
            headers: {
                'barcode': _barcode,
                'name': ''
            }
        }).then(function (res) {
            console.log(res.data)
            if (res.data.length > 0) {
                setName(res.data[0].name);
                setBarcode(res.data[0].barcode);
                setDescription(res.data[0].description);
            } else {
                setAlertHidden(false);
                setAlertSuccess(false);
                setAlertMSG('Produto não encontrado e/ou não existe!');
            }
        }).catch(function (error) {
            setAlertHidden(false);
            setAlertSuccess(false);
            setAlertMSG('Produto não encontrado e/ou não existe!');
        });
    }

    useEffect(() => {
        console.log(props.location)
        setBarcode('');
        setName('');
        setDescription('');

        setSearch(props.location.search.replace('?', ''));
        console.log(search)

        if (search !== '') {
            console.log('search nao é nulo')
            setIsEdit(true);
            handle_Search(search);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <p>{barcode}</p>
                <p>{description}</p>
            </Row>
            <Row>
                <Col>
                    <h3>Adicionar Produto</h3>
                </Col>
            </Row>
            <Row>
                <Form method="POST" action="/api/produtos">
                    <Form.Group controlId="formBarcode">
                        <Form.Label>Barcode*</Form.Label>
                        <Form.Control type="text" placeholder="Escaneie ou digite..." required
                            value={barcode} onChange={setBarcodeValue}></Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control type="text" placeholder="Nome do produto" required
                                value={name} onChange={setNameValue}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label >Descrição</Form.Label>
                            <Form.Control type="text" maxLength={256} placeholder="Descrição do produto"
                                value={description} onChange={setDescriptionValue}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="light" type="button"><a href="/produtos" id="txtVoltar">Voltar</a></Button>
                    <Button variant="primary" type="button"
                        onClick={isEdit === false ? sendForm : updateForm}>Salvar</Button>
                </Form>
            </Row>

        </Container>
    )
}

export default AddProduto;