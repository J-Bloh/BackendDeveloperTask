/*
    start.js Application - run with nodemon
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { handleJSON } = require('./middleware/errorHandler')

var port = 9000;
var hostname = "127.0.0.1";

var cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(cors);
app.use(bodyParser.json());
app.use(handleJSON);

const bookRoutes = require('./routes/bookRoutes');
app.use(bookRoutes);

app.all('*', (req,res) => {        
  console.log("Bad URI!");
  res.sendStatus(400);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;