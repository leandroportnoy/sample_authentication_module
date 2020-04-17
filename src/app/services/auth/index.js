const User = require('../../model/User')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const authConfig = require('../../../config/auth'); //../../config/auth
const mailer = require('../../../modules/mailer' )
var HttpStatus = require('http-status-codes')

const authenticate = async function(req) {
    const {email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')

    if (!user || !await bcrypt.compare(password, user.password))
        return { error: "Invalid User or Password" }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    })
    
    return { user, token }
}

const resetPassword = async function() {
    const { email, token, password } = res.body;

    try {
        const user = await user.findOne({ email })
            .select('+passwordResetToken passwordResertExpires');
        
        if (!user) return { error: "User not found" }
        if (token !== user.passwordResetToken) return { error: "Token invalid" }
        if (Date().now > user.passwordResetExpires) return { error: "Token expired" }

        user.password = password;
        await user.save();
        return
        
    } catch (err) {
        console.log ("Error detail: " + err)
        throw Error('reset password failed')
    }
}

const forgotPassword = async function() {
    const { email }  = req.body;

    try {
        const user = await User.findOne({ email })

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
        mailer.sendMail({
            to: email,
            from: 'leandroportnoy@gmail.com',
            templates: 'auth/forgot_password',
            context: { token }
        }, (err) => {
            if (err)
                return "Cannot send forgot password email"
        })

        res.send("ok")
    } catch (err) {
        console.log ("Error detail: " + err)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "error on forgot password" });
    }
}

module.exports = {
    // register,
    authenticate,
    resetPassword,
    forgotPassword
}
