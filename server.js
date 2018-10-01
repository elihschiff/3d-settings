//dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

//location of the client folder
var clientLocation = __dirname + "/client";

//connect to the mongodb database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error (make sure you have a .env file):'));
db.once('open', function() {
  // we're connected!
});

//starts the server on port 3000
//prints to console that the server is on
app.listen(3000, function() {
  console.log('listening on 3000');
})

//when user goes to localhost:3000/ they will be served ./client/index.html
app.get('/', (req, res) => {
  res.sendFile(clientLocation + '/index.html');
})

//when user goes to localhost:3000/add_settings they will be served ./client/add_settings.html
app.get('/add_settings', (req, res) => {
  res.sendFile(clientLocation + '/add_settings.html');
})

//when the user posts to add_settings the server prints out the settings to the console
app.post('/add_settings', (req, res) => {
  console.log(req.body);
  db.collection('3D Settings').insertOne(req.body, function(err, result) {
    if (err)
      res.send('Error');
    else
      res.sendFile(clientLocation + '/success.html');
  });
})
