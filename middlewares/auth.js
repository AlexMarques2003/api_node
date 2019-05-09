const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    // pega o auth dentro do header
    
    const token_header = req.headers.auth; //|| req.body.auth || req.query.auth;

    if(!token_header) return res.status(401).send({ error: 'Token não enviado!' });

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido'});
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;