const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//CORS
var whitelist = ['http://sisadmin.vercel.app', 'http://localhost:3000']
var corsOptions={
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
    // origin:'http://152.250.17.194:3000',
    // optionsSuccessStatus:200
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