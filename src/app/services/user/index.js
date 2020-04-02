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

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deteleUser
}