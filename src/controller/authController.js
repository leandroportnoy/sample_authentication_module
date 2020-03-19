const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const authConfig = require('../config/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).send({ msg: "up" });
})

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        if (await User.findOne(email))
            return res.status(400).send ( { errorMsg: "User already exist" })

        const user = await User.create(req.body);
        user.password = undefined; //hidden password

        return res.send ({ user });
    } catch (err) {
        return res.status(400).send ( { errorMsg: "Registrarion failed"})
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')

    if (!user)
        return res.status(400).send({ errorMsg: "user not found" });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ errorMsg: "Invalid password" });

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    })

    res.send({ user, token})
})

module.exports = app => app.use('/auth', router);

