/*
    start.js Application - run with nodemon
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { handleJSON } = require('./middleware/errorHandler')

const port = 9000;
const hostname = "127.0.0.1";

const cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
const logRequestTime = function (req, res, next){
  const time = new Date();
  console.log();
  console.log("Request: " + time.toLocaleDateString() +  " - " + time.toLocaleTimeString());
  req.requestTime = time;
  next();
}
app.use(cors);
app.use(bodyParser.json());
app.use(logRequestTime);
app.use(handleJSON);

const bookRoutes = require('./routes/bookRoutes');
app.use(bookRoutes);

app.all('*', (req,res) => {        
  console.log("Bad URL!");
  res.sendStatus(400);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;