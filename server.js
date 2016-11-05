var express = require('express');
var Firebase = require('firebase');
var sc = require('soundcloud-node');

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

var resetAllCounters = function () {
  currentRockVotes = 0;
  currentHipHopVotes = 0;
  currentFunkVotes = 0;
  currentRaveVotes = 0;
};

app.post('/register', function (req, res) {
  numberOfUsers++;
  res.send(200);
});

app.post('/rock', function (req, res) {
  currentRockVotes++;
  console.log('rock votes: ' + currentRockVotes);
  res.send(200);
});

app.post('/hiphop', function (req, res) {
  currentHipHopVotes++;
  console.log('hip hop votes: ' + currentHipHopVotes);
  res.send(200);
});

app.post('/funk', function (req, res) {
  currentFunkVotes++;
  console.log('funk votes: ' + currentFunkVotes);
  res.send(200);
});

app.post('/rave', function (req, res) {
  currentRaveVotes++;
  console.log('rave votes: ' + currentRaveVotes);
  res.send(200);
});

app.post('/change/rock', function (req, res) {
  resetAllCounters();
  console.log('theme change! ROCK');
  res.send(200);
});

app.post('/change/hiphop', function (req, res) {
  resetAllCounters();
  console.log('theme change! HIP HOP');
  res.send(200);
});

app.post('/change/funk', function (req, res) {
  resetAllCounters();
  console.log('theme change! FUNK');
  res.send(200);
});

app.post('/change/rave', function (req, res) {
  resetAllCounters();
  console.log('theme change! RAVE');
  res.send(200);
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
