const User = require('../../model/User')

exports.delete = async function() {
    try {

    } catch (err) {
        console.log ("Error detail: " + err)
        throw Error('user delete failed')
    }
}