const express = require('express');
const User = require('../model/User'); //class
const httpStatus = require('http-status-codes')
var UserService = require('../services/user/index')
//const authMiddleware = require('../middlewares/auth')
//const router = express.Router();

//OAuth
//router.use(authMiddleware);

//all
exports.get_users = async function (req, res) {
    try { 
        const users = await UserService.getUsers()
        return res.send ({ users });
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Users list failed"})
    }
};

// by id
exports.get_user = async function (req, res) {
    try { 
        const user = await UserService.getUserById(req.params.id);
        return res.send ( user );
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Get user failed"})

    }
}

// update
exports.update = async function (req, res) {

    try {
        const user = await UserService.updateUser(req)
        
        if (user == null)
            return res.status(httpStatus.BAD_REQUEST).send ( { error: "User not found"})

        return res.send ( { user, message: "user updated with success" });

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Error on update: user failed"})

    }
}

// delete
exports.delete = async function (req, res) {

    try { 
        const user = await UserService.deteleUser(req)
        if (!user)
            return res.status(httpStatus.BAD_REQUEST).send ( { error: "Error on delete: user not found"})

        return res.status(httpStatus.ACCEPTED).send({ message: "user removed with success" });

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "user remove failed"})

    }
}