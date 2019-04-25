const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let obj = req.query;
    obj.nome
    return res.send({message: `Tudo OK com o método Get! você enviou o nome ${obj.nome} com idade de ${obj.idade} anos!`})
})

app.post('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método Post'})
})

app.listen(3000);

console.log('Conectado')

module.exports = app;