//server.js file
var express = require('express');
var app = express(); 
const path = require('path');
var rootPath = path.normalize(__dirname + '/dist/');
var port = process.env.PORT || 8080; 
app.use(express.static(rootPath)); 
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/my-project/index.html');
});
app.listen(port);
console.log("App listening on port " + port);