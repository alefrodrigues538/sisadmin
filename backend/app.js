const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const multerConfig = require('./config/multer');

const path = require('path');

//PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

    app.use(cors());


    next();
});

// PUBLIC
app.use(express.static(path.join(__dirname, '.', '/public')));
app.use('/img', express.static('./public/imgs'));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//ROUTES
const upload = require("./app/routes/uploadRoute");

const users = require("./app/routes/userRoute");
const fornecedores = require("./app/routes/fornecedorRoute");
const produtos = require("./app/routes/produtoRoute");

//ROTAS

app.use('/api/upload/img', cors(corsOptions), multer(multerConfig).single('file'), upload)

app.use('/api/users', cors(corsOptions), users);
app.use('/api/fornecedores', cors(corsOptions), fornecedores);
app.use('/api/produtos', cors(corsOptions), produtos)

module.exports = app;