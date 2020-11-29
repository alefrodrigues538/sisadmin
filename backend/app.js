const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// //CORS OPTIONS
// var corsOptions={
//     origin:'http://localhost:3000',
//     optionsSuccessStatus: 200
// }
//CORS HEADERS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://sisadmin.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    // app.use(cors(corsOptions));
    app.use(cors());
    next();
});

//ROUTES
const users = require("./app/routes/userRoute");
const fornecedores = require("./app/routes/fornecedorRoute");
const produtos = require("./app/routes/produtoRoute");

//ROTAS
app.use('/api/users', users);
app.use('/api/fornecedores', fornecedores);
app.use('/api/produtos', produtos)

module.exports = app;