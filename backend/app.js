const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//CORS
var corsOptions={
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
}

//PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES
const users = require("./app/routes/userRoute");
const fornecedores = require("./app/routes/fornecedorRoute");
const produtos = require("./app/routes/produtoRoute");

//ROTAS
app.use('/api/users', cors(corsOptions), users);
app.use('/api/fornecedores', cors(corsOptions), fornecedores);
app.use('/api/produtos', cors(corsOptions), produtos)

module.exports = app;