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

var app = express();

app.get('/test', function (req, res) {
  var db = Firebase.database();
  var ref = db.ref("test");
  var blah = 2;
  ref.once("value", function(snapshot) {
    blah = snapshot.val();
  });

  res.send(blah);
});


app.use(express.static('public'))

app.listen(3000)
