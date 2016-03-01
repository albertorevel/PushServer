var express = require('express');
var app = express();
var key = "";

app.get('/', function (req, res) {
   var reqHost = req.hostname;
   console.log("New request from %s:%s", reqHost);
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})