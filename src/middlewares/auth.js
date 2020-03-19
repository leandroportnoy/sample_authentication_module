const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
 
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(400).send({ errorMsg: 'No token provided'})

    const parts = authHeader.split(' ')

    if (!parts.lenght === 2)
        return res.status(400).send({ errorMsg: 'Token error'})
    
    const [ schema, token ] = parts;

    if (!/ˆBearer$/i.test(scheme))
        return res.status(400).send({ errorMsg: 'Token malformatted'})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(400).send({ errorMsg: 'Token invalid'})

        req.userId = decoded.id;

        return next()
    })

} 