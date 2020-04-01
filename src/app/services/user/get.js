const User = require('../../model/User')

exports.get = async function() {

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

exports.getById = async function(id) {

    try { 
        const user = await User.findById(id);
        user.password = undefined;

        return user;

    } catch(err) {
        console.log ("Error detail: " + err)
        throw Error('user by id failed')
    }
}