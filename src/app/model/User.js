const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: true
    },
    cellphone: {
        type: String
    },
    createdAt: {
        type: Date,
        deafult: Date.now
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    status: {
        type: Boolean,
        required: true
    } 
})

UserSchema.pre('save', async function (next) { 
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;

    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User;