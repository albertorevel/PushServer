var express = require('express');
var keys = require('./serverKeys.json');
var requestify = require('requestify');
var app = express();
var authKey = "";
var clientToken = "";

app.get('/notify/:id', function (req, res) {
   var reqId = req.params.id;
   console.log("New request to id: %s", reqId);
      
   requestify.request('https://gcm-http.googleapis.com/gcm/send', {
    method: 'POST',
    body: {
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
    },
  
}).then(function(response) {
	if(response.getCode() == 200) {
		res.send('Notification sent');
	};
})
   
   
})

app.post('/register',function(req, res) {
	var reqId = req.body.id;
	res.sendStatus(404);
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  authKey = keys.authKey;
  clientToken = keys.clientToken;
  
  
	
})
