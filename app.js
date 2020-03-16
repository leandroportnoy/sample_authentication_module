let express = require('express');
let app = express();

//disable cache from express
app.disable('etag');

// configure for param reader suing form-urlencoded and application/json
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure a root route
app.get('/', function (req, res) {
 res.send("server started");
});

// POST saving new user
app.post('/singin', function (req, res) {
    
    let name = req.body.name;
    let lastname = req.body.lastname;
    let cellphone = req.body.cellphone;
    let crefito = req.body.crefito;
    let login = req.body.login;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

	// test if the header is json
	if(req.is("json")) {
		//if json...
		res.json( { name:name, lastname:lastname } );
	} else {
        //otherwise send like a text
		// Caso contrário envia como texto
		res.type("text").send("Texto: " + name + " " + lastname);
	}
})

app.post('/reset', function (req, res) {
    console.log("reset password route")
    res.type("return").send("reset password route");
})

// start the server
let server = app.listen(3000, function () {
 let host = server.address().address;
 let port = server.address().port;
 console.log("Servidor iniciado em http://%s:%s", host, port);
});