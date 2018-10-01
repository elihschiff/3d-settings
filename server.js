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
//define this type
var ObjectId = mongoose.Types.ObjectId;
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

//allows for all items in the public folder to be accessed
app.use(express.static(process.cwd() + '/public'));

//when user goes to localhost:3000/ they will be served ./client/index.html
app.get('/', (req, res) => {
  res.sendFile(clientLocation + '/index.html');
})

//when user goes to localhost:3000/add_settings they will be served ./client/add_settings.html
app.get('/add_settings', (req, res) => {
  res.sendFile(clientLocation + '/add_settings.html');
})

//creating a schema
var Schema = mongoose.Schema
var settingsSchmea = new Schema({
  name: String,
  printSpeed: Number,
  layerHeight: Number,
  plastic: String
})


//making a model
var settingsModel = mongoose.model("3D Settings", settingsSchmea);

//when the user posts to add_settings the server prints out the settings to the console
app.post('/add_settings', (req, res) => {
  console.log(req.body);
  let instance = new settingsModel({ name: req.body.name, printSpeed: req.body.printSpeed, layerHeight: req.body.layerHeight, plastic: req.body.plastic})
  instance.save((err) => {
    console.log(err);
  })
  //saved
  res.sendFile(clientLocation + "/success.html");
})

app.get('/get_settings/:id', (req, res) => {
  settingsModel.find({_id: ObjectId(req.params.id)}, (err, settings) => {
    if (err) {
    console.log(err);
    return;
    }
    console.log(settings);
    res.send(settings);
  })
})
