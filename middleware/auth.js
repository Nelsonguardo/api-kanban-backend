const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../utils/jwt');

exports.auth = (req, res, next) => {
    try {
        // Verificar si existe el header
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 'error',
                message: 'No se proporcionó token de autenticación'
            });
        }

        // Obtener el token y limpiar comillas si existen
        let token = req.headers.authorization.replace(/['"]+/g, '');

        // Si el token tiene el prefijo Bearer, quitarlo
        if (token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }

        try {
            // Decodificar token
            const payload = jwt.decode(token, secret);

            // Verificar expiración
            if (payload.exp <= moment().unix()) {
                return res.status(401).json({
                    status: 'error',
                    message: 'El token ha expirado'
                });
            }

            // Agregar datos del usuario al request
            req.user = payload;
            next();

        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Token inválido o malformado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error en la autenticación'
        });
    }
};