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

app.post('/register', function (req, res) {
  numberOfUsers++;
});

app.post('/rock', function (req, res) {
  console.log('rock vote recieved');
});

app.post('/hiphop', function (req, res) {
  console.log('hip hop vote recieved');
});

app.post('/funk', function (req, res) {
  console.log('funk vote recieved');
});

app.post('/rave', function (req, res) {
  console.log('rave vote recieved');
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

app.listen(3000)
