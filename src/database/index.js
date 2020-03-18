const mongoose = require('mongoose')
mongoose.connect('http://localhost/personalcli_database')
//mongoose.createConnection('http://localhost/personalcli_database')
mongoose.Promise = global.Promise

module.exports = mongoose;