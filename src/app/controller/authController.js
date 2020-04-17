// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto')
// const User = require('../model/User'); //class
// const authConfig = require('../../config/auth');
// const mailer = require('../../modules/mailer' )
// const router = express.Router();
// var HttpStatus = require('http-status-codes')

// //ROUTES
// //ROOT
// // router.get('/', async (req, res) => {
// //     return res.status(200).send({ msg: "up" });
// // })

// // REGISTER
// router.post('/register', async (req, res) => {
    
//     const { email } = req.body
//     try {
//         if (await User.findOne({ email }))
//             return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "User already exist" })

//         const user = await User.create(req.body);
//         user.password = undefined; //hidden password
    
//         return res.send ({ user });
//     } catch (err) {
//         console.log ("Error detail: " + err)
//         return res.status(400).send ( { errorMsg: "Registration failed"})
//     }
// })

// // AUTHENTICATE
// router.post('/authenticate', async (req, res) => {
    
//     const {email, password } = req.body;
//     const user = await User.findOne({ email }).select('+password')

//     if (!user || !await bcrypt.compare(password, user.password))
//         return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "Invalid User or Password" });

//     user.password = undefined

//     const token = jwt.sign({ id: user.id }, authConfig.secret, {
//         expiresIn: 86400
//     })

//     res.send({ user, token})
// })

// //FORGOT PASSWORD
// router.post('/forgot_password', async (req, res) => {
//     const { email }  = req.body;

//     try {
//         const user = await User.findOne({ email })

//         if (!user)
//             return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "email not found" });

//         const token = crypto.randomBytes(20).toString('hex')
//         const now = new Date()
//         now.setHours(now.getHours() + 1)

//         await User.findByIdAndUpdate(user.id, {
//             '$set': {
//                 passwordResetToken: token,
//                 passwordResetExpires: now
//             }
//         })
//         //send mail
//         mailer.sendMail({
//             to: email,
//             from: 'leandroportnoy@gmail.com',
//             templates: 'auth/forgot_password',
//             context: { token }
//         }, (err) => {
//             if (err)
//                 return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ error: "Cannot send forgot password email"});
//         })

//         res.send("ok")
//     } catch (err) {
//         console.log(err)
//         return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "error on forgot password" });
//     }
// })

// //RESERT PASSWORD
// router.post('/resert_password', async (req, res) => {

//     const { email, token, password } = res.body;

//     try {

//         const user = await user.findOne({ email })
//             .select('+passwordResetToken passwordResertExpires');
        
//         if (!user)
//             return res.status(400).send({ error: 'User not found' })
        
//         if (token !== user.passwordResetToken)
//             return res.status(400).send({ error: 'Token invalid' })

//         if (Date().now > user.passwordResetExpires)
//             return res.status(400).send({ error: 'Token expired' })

//         user.password = password;

//         await user.save();

//         res.send()

//     } catch (err) {
//         return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ error: 'Error! Cannot reset password. Try again.' })
//     }

// })
// module.exports = app => app.use('/auth', router);

const express = require('express');
const User = require('../model/User'); //class
const httpStatus = require('http-status-codes')
var HttpStatus = require('http-status-codes')
var AuthService = require('../services/auth/index')
var UserService = require('../services/user/index')

exports.register = async function (req, res) {
    try { 
        if (await UserService.getUserByEmail(req))
            return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "User already exist" })

        const user = UserService.createUser(req)
        return res.send ({ user });

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Registration failed"})
    }
}

exports.authentication = async function (req, res) {
    try {
        const user = AuthService.authenticate(req)
        return res.send({ user })
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Auth failed"})
    }
}

exports.forgot_password = async function (req, res) {
    try { 
        if (!UserService.getUserByEmail(req))
            return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "email not found" });
        
        

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Forgot password user failed"})
    }

}

exports.reset = async function (req, res) {
    // const { email } = req.body
    try {



        // const user = await User.findOne({ email })
        // return user
        // if (user != null)
        //     return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "User already exist" })
        
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Reset password user failed"})
    }

}