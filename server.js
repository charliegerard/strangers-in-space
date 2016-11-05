var app = require('express')();
var express = require('express');
var Firebase = require('firebase');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Player = require('player');

var config = {
  apiKey: "AIzaSyCufFUbb5zzaMscOaza0oJDmcV-9ZTdHjY",
  authDomain: "strangers-in-space.firebaseapp.com",
  databaseURL: "https://strangers-in-space.firebaseio.com",
  storageBucket: "strangers-in-space.appspot.com",
  messagingSenderId: "748579681540"
};
Firebase.initializeApp(config);
Firebase.auth().signInWithEmailAndPassword('jamesl@thoughtworks.com', 'welcome1');

var resetAllCounters = function () {
  votes.rock.current = 0;
  votes.hiphop.current = 0;
  votes.funk.current = 0;
  votes.rave.current = 0;
};

var votes = {
  rock: {
    name: 'rock',
    current: 0,
    upper: 10,
    playlist: new Player('./testRock.mp3')
  },
  hiphop: {
    name: 'hiphop',
    current: 0,
    upper: 10,
    playlist: new Player('./testHipHop.mp3')
  },
  funk: {
    name: 'funk',
    current: 0,
    upper: 10,
    playlist: new Player('./testFunk.mp3')
  },
  rave: {
    name: 'rave',
    current: 0,
    upper: 10,
    playlist: new Player('./testRave.mp3')
  }
}

var stopPlayers = function () {
 votes.rock.playlist.stop();
 votes.hiphop.playlist.stop();
 votes.funk.playlist.stop();
 votes.rave.playlist.stop();
};

var changeTheme = function (theme) {
  resetAllCounters();
  console.log('theme change! ' + theme.name);
  stopPlayers();

  theme.playlist.play(function(err, player) {
   console.log('play end');
  });
};

var users = {};

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('a user connected');

  app.post('/register/:deviceId', function (req, res) {
    const deviceId = req.params.deviceId;

    if(deviceId in users) {
      console.log('USER ALREADY REGISTERED');
      res.send(200);
      return;
    }

    users[deviceId] = req.query.token;
    console.log(users);
    io.emit('users', {count : users.size});

    res.send(200);
  });

  app.post('/vote/:theme', function (req, res) {
    const theme = votes[req.params.theme];
    theme.current++;

    console.log(theme.name + ' votes: ' + theme.current);
    io.emit('votes', {type: theme.name, votes: theme.current});

    if(theme.current === 7) {
      console.log('ALMOST TIME TO CHANGE TO ' + theme.name);
      notifyUsers();
    }

    if(theme.current >= theme.upper) {
      console.log('CHANGE TO ' + theme.name);
      changeTheme(theme);
    }

    res.send(200);
  });
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

http.listen(process.env.PORT || 3000);
