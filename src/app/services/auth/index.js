const User = require('../../model/User')

// const register = async function(req) {
    // try {
    //     const user = AuthService
    //     user.password = undefined; //hidden password
    
    //     return user;

    // } catch(err) {
    //     console.log ("Error detail: " + err)
    //     throw Error('register user failed')

        // console.log ("Error detail: " + err)
        // return res.status(400).send ( { errorMsg: "Registration failed"})
    // }

    // const { email } = req.body
    // try {
    //     if (await User.findOne({ email }))
    //         return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "User already exist" })

    //     const user = await User.create(req.body);
    //     user.password = undefined; //hidden password
    
    //     return res.send ({ user });
    // } catch (err) {
    //     console.log ("Error detail: " + err)
    //     return res.status(400).send ( { errorMsg: "Registration failed"})
    // }
// }

const authenticate = async function(req) {
    const {email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')

    if (!user || !await bcrypt.compare(password, user.password))
        return "Invalid User or Password"
        //return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errorMsg: "Invalid User or Password" });

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    })
    return { user, token }
    //res.send({ user, token})

}

const resetPassword = async function() {
    const { email, token, password } = res.body;

    try {
        const user = await user.findOne({ email })
            .select('+passwordResetToken passwordResertExpires');
        
        if (!user) return "User not found" //return res.status(400).send({ error: 'User not found' })
        if (token !== user.passwordResetToken) return "Token invalid" //return res.status(400).send({ error: 'Token invalid' })
        if (Date().now > user.passwordResetExpires) return "Token expired" //return res.status(400).send({ error: 'Token expired' })

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
                //return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ error: "Cannot send forgot password email"});
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
