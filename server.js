var express = require('express');
var jsonfile = require('jsonfile');
var util = require('util');
var requestify = require('requestify');
var requests = require('request');
var app = express();
var authKey = "";
var clientToken = "";
var file = './serverKeys.json';
var keys;

app.get('/notify/:id', function (req, res) {
   var reqId = req.params.id;
   console.log("New request to id: %s", reqId);
   console.log(authKey);
   console.log(clientToken);
      
  /* requestify.request('http://gcm-http.googleapis.com/gcm/send', {
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
}) */
   
  
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
		console.log(body);
	}
   });
   
})

app.post('/register',function(req, res) {
	var reqId = req.body.id;
	var reqToken = req.body.token;
	console.log("requestID: %s", reqId);
	console.log("request token: %s", reqToken);
	res.sendStatus(404);
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  

  keys = jsonfile.readFileSync(file);
  
  authKey = keys.authKey;
  clientToken = keys.clientToken;
  
  
	
})
