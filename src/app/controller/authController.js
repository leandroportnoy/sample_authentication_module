const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const User = require('../model/User'); //class
const authConfig = require('../../config/auth');
const mailer = require('../../modules/mailer' )
const router = express.Router();

//ROUTES
//ROOT
router.get('/', async (req, res) => {
    return res.status(200).send({ msg: "up" });
})

// REGISTER
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

// AUTHENTICATE
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

//FORGOT PASSWORD
router.post('/forgot_password', async (req, res) => {
    const { email }  = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user)
            return res.status(400).send({ errorMsg: "email not found" });

        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        //send mail
        mailer.sendEmail({
            to: email,
            from: 'leandroportnoy@gmail.com',
            templates: 'auth/forgot_password',
            context: { token }
        }), (err) => {
            if (err)
                return res.status(400).send({ error: "Cannot send forgot passrod email"})
        }


    } catch (err) {
        return res.status(400).send({ errorMsg: "error on forgot password" });
    }
})

//RESERT PASSWORD
router.post('/resert_password', async (req, res) => {

    const { email, token, password } = res.body;

    try {

        const user = await user.findOne({ email })
            .select('+passwordResetToken passwordResertExpires');
        
        if (!user)
            return res.status(400).send({ error: 'User not found' })
        
        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' })

        if (Date().now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired' })

        user.password = password;

        await user.save();

        res.send()

    } catch (err) {
        return res.status(400).send({ error: 'Error! Cannot reset password. Try again.' })
    }

})
module.exports = app => app.use('/auth', router);

