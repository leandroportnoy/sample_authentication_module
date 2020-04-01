const express = require('express');
const User = require('../model/User'); //class
const httpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

var UserService = require('../services/user/get')    

//OAuth
router.use(authMiddleware);

//all
exports.get_users = async function (req, res) {
    try { 
        const users = await UserService.get()
        return res.send ({ users });
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Users list failed"})
    }
};

// by id
exports.get_user = async function (req, res) {
    try { 
        const user = await UserService.getById(req.params.id);
        return res.send ( user );
    } catch(err) {
        console.log ("Error detail: " + err)
        return res.status(httpStatus.BAD_REQUEST).send ( { error: "Get user failed"})

    }
}

// //update
// exports.update = async function (req, res) {

//     try { 
//         const user = await UserService.update()
//         return user;

//     } catch(err) {
//         console.log ("Error detail: " + err)
//         return res.status(httpStatus.BAD_REQUEST).send ( { error: "Update user failed"})

//     }
// }

// //delete
// exports.delete = async function (req, res) {

//     try { 
//         const user = await UserService.delete(req.params.id, {
//             status: false
//         }, { new: true }
//         );

//         // return user;
//         // const user = await User.findByIdAndUpdate(req.params.id, {
//         //     status: false
//         // }, { new: true }
//         // );

// //        await user.save();
//   //      user.password = undefined; //hidden password

//         return "user removed";

//     } catch(err) {
//         console.log ("Error detail: " + err)
//         return res.status(httpStatus.BAD_REQUEST).send ( { error: "user remove failed"})

//     }
// }
// });

// module.exports = app => app.use('/user', router);