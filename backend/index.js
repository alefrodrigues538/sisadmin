const express = require('express');
const routes = require('./app/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes)

//MODELS
// const { User } = require('./app/models');

// User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(3006);