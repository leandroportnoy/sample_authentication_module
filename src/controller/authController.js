const express = require('express');
const User = require('../model/User')
const router = express.Router()

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

module.exports = app => app.use('/auth', router);

