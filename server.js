var app = require('express')();
var express = require('express');
var Firebase = require('firebase');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Http = require('http');

var config = {
  apiKey: "AIzaSyCufFUbb5zzaMscOaza0oJDmcV-9ZTdHjY",
  authDomain: "strangers-in-space.firebaseapp.com",
  databaseURL: "https://strangers-in-space.firebaseio.com",
  storageBucket: "strangers-in-space.appspot.com",
  messagingSenderId: "748579681540",
  messageingServerKey: "AIzaSyAHiL6jDL0FggfsAzhf_nX9FZ1hjnl3HFg"
};
Firebase.initializeApp(config);
Firebase.auth().signInWithEmailAndPassword('jamesl@thoughtworks.com', 'welcome1');

var users = [];

var votes = {
  rock: {
    name: 'rock',
    current: 0,
    upper: 10
  },
  hiphop: {
    name: 'hiphop',
    current: 0,
    upper: 10
  },
  funk: {
    name: 'funk',
    current: 0,
    upper: 10
  },
  rave: {
    name: 'rave',
    current: 0,
    upper: 10
  }
}

var resetAllCounters = function () {
  votes.rock.current = 0;
  votes.hiphop.current = 0;
  votes.funk.current = 0;
  votes.rave.current = 0;
};

var changeTheme = function (theme) {
  resetAllCounters();
  console.log('theme change! ' + theme.name);
};

var makeHttpRequest = function (method, options, message) {
  options.method = method;

  var callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  }

  var req = Http.request(options, callback);
  req.write(message);
  req.end();
};

var notifyUsers = function (theme) {
  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    headers: {'Content-Type': 'application/json', 'Authorization': 'key=' + config.messageingServerKey}
  };

  var message = '{"to": "/topics/themeChange","data": {"message": "' + theme.name + '",}}'

  makeHttpRequest('POST', options, message);
};

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('a user connected');

  app.post('/register/:token', function (req, res) {
    const token = req.params.token;

    if(users.indexOf(token) > -1) {
      console.log('USER ALREADY REGISTERED');
      res.send(200);
      return;
    }

    users.push(req.params.token);
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
      io.emit('changeApproaching', {type: theme.name});
      notifyUsers(theme);
    }

    if(theme.current >= theme.upper) {
      console.log('CHANGE TO ' + theme.name);
      io.emit('changeTheme', {type: theme.name});
      changeTheme(theme);
    }

    res.send(200);
  });

  app.post('/testMessage/:theme', function (req, res) {
    const theme = votes[req.params.theme];
    notifyUsers(theme);
    res.send(200);
  });
});

http.listen(process.env.PORT || 3000);
