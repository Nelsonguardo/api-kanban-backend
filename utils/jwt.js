//Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

//Clave secreta desde variables de entorno
const secret = process.env.JWT_SECRET;

//Crear una función para generar el token
const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        iat: moment().unix(),
        exp: moment().add(process.env.JWT_EXPIRATION, 'days').unix()
    };
    //Devolver el token
    return jwt.encode(payload, secret);
}

module.exports = {
    createToken,
    secret
}