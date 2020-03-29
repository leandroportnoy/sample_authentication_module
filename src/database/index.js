const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/personalcli_database', { useMongoClient: true })
//mongoose.createConnection('http://localhost/personalcli_database')
mongoose.Promise = global.Promise

module.exports = mongoose;