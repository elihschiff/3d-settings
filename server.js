//dependencies
require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//location of the client folder
var clientLocation = __dirname + "/client";

//connect to the mongodb database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error (make sure you have a .env file):'));
db.once('open', function() {
  // we're connected!
});


var printerSettingsSchema = new mongoose.Schema({
  model: String,
  layerHeight: String
});
var printSettings = mongoose.model('printerSettings', printerSettingsSchema);

//starts the server on port 3000
//prints to console that the server is on
app.listen(3000, function() {
  console.log('listening on 3000');
})

//when user goes to localhost:3000/ they will be served ./client/index.html
app.get('/', (req, res) => {
  res.sendFile(clientLocation + '/index.html');
})

//when the user posts to add_settings the server prints out the settings to the console
app.post('/add_settings', (req, res) => {
   console.log(req.body);
   db.collection('employees').insertOne(req.body, function (err, result) {
      if (err)
         res.send('Error');
      else
        res.send('Success');

  });

})