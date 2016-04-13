// modules
var express = require('express');
var jsonfile = require('jsonfile');
var util = require('util');
var requestify = require('requestify');
var bodyParser = require('body-parser')
var requests = require('request');
//variables
var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var serverFile = './serverKeys.json';
var clientsFile = './clientsKeys.json';
var serverKeys;
var clientsKeys;
var authKey = "";

app.get('/notify/:id', function (req, res) {
   var reqId = req.params.id;
   console.log("New request to id: %s", reqId);
   
    var clientToken = clientsKeys[reqId].token;
	
	 
 /*  requestify.request('http://gcm-http.googleapis.com/gcm/send', {
    method: 'POST',
    body: {
		'data' : {
        'id': '0ababa34',
		'nombre': 'Alarma 1',
		'descripcion': 'Esta alarma ha sido lanzada',
		'imagen': 'null',
		'origen': 'tirador baño',
		'relativo': 'Miquel Roig',
		'zona': 'Hab. 102',
		'estado': '0'
		},
		'to': clientToken
        
    },
    headers: {
        'Content-Type': 'application/json',
		'Authorization': 'key='+authKey
    }
  
}).then(function(response) {
	console.log(response.getCode);
	if(response.getCode() == 200) {
		res.send('Notification sent');
	};
})
    */
  
   requests.post({ 
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'key='+authKey
	   },
	url: 'http://gcm-http.googleapis.com/gcm/send',
	 json: {
		'data' : {
        'id': '0ababa34',
		'nombre': 'Alarma 1',
		'descripcion': 'Esta alarma ha sido lanzada',
		'imagen': 'null',
		'origen': 'tirador baño',
		'relativo': 'Miquel Roig',
		'zona': 'Hab. 102',
		'estado': '0'
		},
		'to': clientToken
        
    }, function(error, response, body) {
		if(response.getStatus==200) {
			console.log("OK");
			res.send(200);
		} else {
			console.log("ERR");
			res.send(400);
		}
	}
   });
   
})

app.post('/register',jsonParser,function(req, res) {
	/* var reqId = req.body.id;
	console.log("requestID: %s", reqId); */
	
	console.log("New register request");
	var reqToken = req.body.token;
	var reqUsername = req.body.username;
	var reqPassword = req.body.password;
	
	var lastKey = Object.keys(clientsKeys).sort().reverse()[0];
	
	
	var newKey = parseInt(lastKey) + 1;
	
	var key = 0;
	for(var present = false; key <= lastKey; key ++) {
		if(clientsKeys[key].token == reqToken) {
			present = true;
			break;
		}
	}

	console.log(""+present);
	
	if(!present) {
		clientsKeys[newKey] = {'token': reqToken,
			'username': reqUsername,
			'password': reqPassword};

		jsonfile.writeFileSync(clientsFile,clientsKeys); 
	} 
	
	res.sendStatus(200);
})




var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  

  serverKeys = jsonfile.readFileSync(serverFile);
  authKey = serverKeys.authKey;
  
  clientsKeys = jsonfile.readFileSync(clientsFile);
	
})
