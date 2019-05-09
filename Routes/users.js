const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');


// Funções auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'batatafrita', { expiresIn: '7d' });
}

router.get('/', auth, async (req, res) => {
    try{
        const users = await Users.find({});
        return jwt.sign({ id: userId }, 'batatafrita', { expiresIn: '7d' });
    }
    catch(err) {
        return res.send({ error: 'Erro na consulta de usuários'});
    }
});

/*
router.get('/', (req, res) => {
    Users.find({}, (err, data) =>{
        if(err) return res.send({ error: 'Erro na consulta de usuários!' });
        console.log(data);
        return res.send(data);
    });    

});
*/

router.post('/create', async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: 'Dados insuficientes' });

    try {
        if(await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado!' });
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }
    catch (err){
        if (err) return res.send({ error: 'Erro ao buscar usuário'}); 
    }
});
/*
router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({error: 'Dados insuficientes'});

    Users.findOne( { email }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuário'});
        if (data) return res.send({ error: 'Usuário já cadastrado'});

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário' });
            //data.password = undefined; // escondendo a senha
            return res.send(data);

        });
    });

});
*/

router.post('/auth', async(req, res) => {
    const {email, password } = req.body;

    if( !email || !password ) return res.send({ error: 'Dados Insuficientes!'});

    try{
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.send({error: 'Usuário não registrado'});
    
        const pass_ok = await bcrypt.compareSync(password, user.password);
    
        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário' });
        user.password = undefined;

        return res.send({user, token: createUserToken(user.id)});
                
    }
    catch (err){
        return res.send({error: 'Erro ao buscar usuário'});
    }
});
/*
router.post('/auth', (req, res) => {
    const {email, password } = req.body;

    if( !email || !password ) return res.send({ error: 'Dados Insuficientes!'});

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao buscar Usuário!' });
        if(!data) return res.send({ error: 'Usuário não registrado' });
    
        var compara = bcrypt.compareSync(password, data.password,); 
        if(!compara) return res.send({error: 'Erro ao consultar usuário'})

        data.password = undefined;
        return res.send(data);

    }).select('+password');

});
*/
module.exports = router;
