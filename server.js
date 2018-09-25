require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

var clientLocation = __dirname + "/client";


var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error (make sure you have a .env file):'));
db.once('open', function() {
  // we're connected!
});

//Temp schemas
var kittySchema = new mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'


app.listen(3000, function() {
  console.log('listening on 3000');
})

app.get('/', (req, res) => {
  res.sendFile(clientLocation + '/index.html');
})

app.post('/quotes', (req, res) => {
   console.log(req.body);
})
