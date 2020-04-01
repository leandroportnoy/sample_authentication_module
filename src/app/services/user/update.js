const User = require('../../model/User')

exports.update = async function (req, res) {

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

        return user;

    } catch (err) {
        console.log ("Error detail: " + err)
        throw Error('user update failed')
    }
}