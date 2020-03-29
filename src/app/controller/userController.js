const express = require('express');
const User = require('../model/User'); //class
const httpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const router = express.Router();
//OAuth
router.use(authMiddleware);

//all
router.get('/', async (req, res) => {

    try { 
        const users = await User.find();

        users.map( user => {
            user.password = undefined
        })

        return res.send ({ users });
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Users list failed"})

    }
});

// by id
router.get('/:id', async (req, res) => {

    try { 
        const user = await User.findById(req.params.id);
        user.password = undefined; //hidden password

        return res.send ( user );
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Get user failed"})

    }
});

//update
router.put('/:id', async (req, res) => {

    try { 
        const { name, lastname, email, cellphone, crefito, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {
            name, 
            lastname, 
            email, 
            cellphone, 
            crefito, 
            status
        }, { new: true }
        );

        await user.save();

        user.password = undefined; //hidden password

        return res.send ( user );

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Update user failed"})

    }
});

//delete
router.delete('/:id', async (req, res) => {

    try { 
        // const { name, lastname, email, cellphone, crefito, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {
            status: false
        }, { new: true }
        );

        await user.save();

        user.password = undefined; //hidden password

        return res.send ( { message: "user removed" } );

    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "user remove failed"})

    }
});


module.exports = app => app.use('/user', router);