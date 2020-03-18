let express = require('express');
// configure for param reader suing form-urlencoded and application/json
var bodyParser = require('body-parser');

const app = express();

//disable cache from express
app.disable('etag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/controller/authController')(app);

let server = app.listen(3000, function () {
 let host = server.address().address;
 let port = server.address().port;
 console.log("Servidor iniciado em http://%s:%s", host, port);
});

