var express = require('express');
var Firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCufFUbb5zzaMscOaza0oJDmcV-9ZTdHjY",
  authDomain: "strangers-in-space.firebaseapp.com",
  databaseURL: "https://strangers-in-space.firebaseio.com",
  storageBucket: "strangers-in-space.appspot.com",
  messagingSenderId: "748579681540"
};
Firebase.initializeApp(config);
Firebase.auth().signInWithEmailAndPassword('jamesl@thoughtworks.com', 'welcome1');

var app = express();

var numberOfUsers = 0;
var currentRockVotes = 0;
var currentHipHopVotes = 0;
var currentFunkVotes = 0;
var currentRaveVotes = 0;

app.post('/register', function (req, res) {
  numberOfUsers++;
});

app.post('/rock', function (req, res) {
  currentRockVotes++;
  console.log('rock votes: ' + currentRockVotes);
});

app.post('/hiphop', function (req, res) {
  currentHipHopVotes++;
  console.log('hip hop votes: ' + currentHipHopVotes);
});

app.post('/funk', function (req, res) {
  currentFunkVotes++;
  console.log('funk votes: ' + currentFunkVotes);
});

app.post('/rave', function (req, res) {
  currentRaveVotes++;
  console.log('rave votes: ' + currentRaveVotes);
});

// some random test endpoint to show how to use firebase
app.get('/test', function (req, res) {
  var db = Firebase.database();
  var ref = db.ref("/test");
  var blah = 2;
  ref.once("value", function(snapshot) {
    blah = snapshot.val();
    res.send(JSON.stringify({ a: blah }));
  }, function(error) {
    console.log(error);
  });
});


app.use(express.static('public'))

app.listen(process.env.PORT || 3000);
