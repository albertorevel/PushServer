var express = require('express');
var keys = require('./serverKeys.json');
var requestify = require('requestify');
var app = express();
var authKey = "";
var clientToken = "";

app.get('/', function (req, res) {
   var reqHost = req.hostname;
   console.log("New request from %s", reqHost);
      
   requestify.request('https://gcm-http.googleapis.com/gcm/send', {
    method: 'POST',
    body: {
        'data': {
			'score': '5x1',
			'time': '16:10'
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

app.post('/signup',function(req, res) {
	res.send('Not ready');
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  authKey = keys.authKey;
  clientToken = keys.clientToken;
  
  
	
})