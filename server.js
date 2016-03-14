var express = require('express');
var jsonfile = require('jsonfile');
var util = require('util');
var requestify = require('requestify');
var bodyParser = require('body-parser')
var requests = require('request');
var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var authKey = "";
var clientToken = "";
var file = './serverKeys.json';
var keys;

app.get('/notify/:id', function (req, res) {
   var reqId = req.params.id;
   console.log("New request to id: %s", reqId);
     clientToken = keys.clients[reqId];
	 
	 console.log(clientToken);
	 
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
	var reqToken = req.body.token;
	console.log("request token: %s", reqToken);
	console.log(keys.clients);
	var lastKey = Object.keys(keys.clients).sort().reverse()[0];
	var newKey = parseInt(lastKey) + 1;
	
	keys.clients[newKey] = reqToken;
	
	jsonfile.writeFileSync(file,keys);
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  

  keys = jsonfile.readFileSync(file);
  
  authKey = keys.authKey;
  
  
	
})
