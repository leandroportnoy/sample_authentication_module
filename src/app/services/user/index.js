const User = require('../../model/User')

const getUsers = async function() {

    try { 
        const users = await User.find();
        users.map( user => {
            user.password = undefined
        });

        return users;
    } catch(err) {
        console.log ("Error detail: " + err)
        throw Error('Users list failed')
    }
}

const getUserById = async function(id) {

    try { 
        const user = await User.findById(id);
        user.password = undefined;

        return user;

    } catch(err) {
        console.log ("Error detail: " + err)
        throw Error('user by id failed')
    }
}

const updateUser = async function (req) {

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

        if (user == null)
            return null

        await user.save();

        user.password = undefined; //hidden password

        return user;

    } catch (err) {
        console.log ("Error detail: " + err)
        throw Error('user update failed')
    }
}

const deteleUser = async function(req) {
    try {

        const user = await User.findByIdAndUpdate(req.params.id, {
            status: false
        }, { new: true }
        );
            console.log(user)
        if (user == null)
            return false

        await user.save();

        return true

    } catch (err) { 
        console.log ("Error detail: " + err)
        throw Error('user delete failed')
    }
}

const getUserByEmail = async function(req) {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        //return user
    } catch(err) {
        console.log ("Error detail: " + err)
        throw Error('Find user by email failed')
    }
}

const createUser = async function(req) {
    try { 
        const user = await User.create(req.body);
        user.password = undefined; //hidden password
    
        return user

    } catch(err) {
        console.log ("Error detail: " + err)
        throw Error('Create user failed')
    }
}

const getAuthenticatedUser = async function(req) {
    
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deteleUser
}