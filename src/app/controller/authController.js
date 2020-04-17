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
        const user = await AuthService.authenticate(req)
        return res.send(user)
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Auth failed"})
    }
}

exports.forgot_password = async function (req, res) {
    try { 
        if (await !UserService.getUserByEmail(req))
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