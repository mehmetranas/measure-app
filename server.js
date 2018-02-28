var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.all('*', function (req, res) {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);
