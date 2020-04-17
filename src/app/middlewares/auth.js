const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const httpStatus = require('http-status-codes')

module.exports = (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader)
    //     return res.status(httpStatus.PROXY_AUTHENTICATION_REQUIRED).send({ error: 'No token provided'})

    // const parts = authHeader.split(' ')

    // if (!parts.lenght === 2)
    //     return res.status(httpStatus.PROXY_AUTHENTICATION_REQUIRED).send({ error: 'Token error'})
    
    // const [ scheme, token ] = parts;

    // if (!/^Bearer$/i.test(scheme))
    //     return res.status(httpStatus.PROXY_AUTHENTICATION_REQUIRED).send({ error: 'Token malformatted'})

    // jwt.verify(token, authConfig.secret, (err, decoded) => {
    //     if (err) 
    //         return res.status(httpStatus.BAD_REQUEST).send({ error: 'Token invalid'})

    //     req.userId = decoded.id;

    //     return next()
    // })

} 