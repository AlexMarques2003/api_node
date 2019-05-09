const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// String de conexão => mongodb+srv://usuario_admin:230681a1@clusterapi-vve0c.mongodb.net/test?retryWrites=true
const url = 'mongodb+srv://usuario_admin:230681a1@clusterapi-vve0c.mongodb.net/test?retryWrites=true';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: '+ err);
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Aplicação desconectada do banco de dados')
})

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

console.log('Conectado')

module.exports = app;