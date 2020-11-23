const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const { User } = require('./app/models');

//PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES
const users = require("./app/routes/userRoute");
const fornecedores = require("./app/routes/fornecedorRoute");

//ROTAS
app.use('/api/users', users);
app.use('/api/fornecedores', fornecedores);

module.exports = app;