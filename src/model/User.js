const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    cellphone: {
        type: String,
        required: true
    },
    crefito: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true, 
        deafult: Date.now
    },
    status: {
        type: String,
        required: true
    } 
})

UserSchema.pre('save', async function (next) { 
    const hash = await bcrypt.hash(this.password)
    this,password = hash;

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User;