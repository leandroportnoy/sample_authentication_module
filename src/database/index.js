const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/personalcli'
mongoose.connect(url, function(err, db) {
    if (err) 
        throw err;
    console.log("Database created already");
  });
mongoose.Promise = global.Promise

module.exports = mongoose;