$(document).ready(function(){
  var socket = io();
  var numberOfUsers = 0;
  var audio = new Audio();

  var rockPlaylist = new Playlist('rock', 0, 0);
  var hipHopPlaylist = new Playlist('hiphop', 0, 1);
  var funkPlaylist = new Playlist('funk', 0, 2);
  var ravePlaylist = new Playlist('rave', 0, 3);

  //Setup default playlist, if needed;
  var currentPlaylist = hipHopPlaylist;

  funkBackground();
  createConfettis(1);

  socket.on('users', function(data){
    numberOfUsers = data.count;
  })

  // Getting the data from the post event to get votes;
  socket.on('votes', function(data){
    console.log('type of music', data.type)
    console.log('current number of votes', data.votes);

    switch(data.type){
      case 'rock':
        rockPlaylist.vote(data.votes);
        waveChart('w-rock', data.votes/10);
        break;
      case 'hiphop':
        hipHopPlaylist.vote(data.votes);
        waveChart('w-hiphop', data.votes/10);
        break;
      case 'funk':
        funkPlaylist.vote(data.votes);
        waveChart('w-funk', data.votes/10);
        break;
      case 'rave':
        ravePlaylist.vote(data.votes);
        waveChart('w-dance', data.votes/10);
        break;
      default:
        break;
    }
  });

  function clearCanvas(){
    var canvas = document.getElementById('c').remove();
  }

  function clearConfettis(){
    var musicBlock = document.getElementsByClassName('music-block')[currentPlaylist.index];
    var canvas = musicBlock.getElementsByClassName('world')[0]
    canvas.remove();
  }

  function clearVotes(){
    waveChart('w-rock', 0);
    waveChart('w-hiphop', 0);
    waveChart('w-funk', 0);
    waveChart('w-dance', 0);
  }

  socket.on('changeApproaching', function(data) {
    console.log("OMG we're about to change to " + data.type);
  });

  socket.on('changeTheme', function(data) {
    console.log('changing theme to ' + data.type);

    clearConfettis();
    clearVotes()

    switch(data.type) {
      case 'rock':
        currentPlaylist = rockPlaylist;
        // clearCanvas();
        playTunes('highway to hell');
        createConfettis(0);
        break;
      case 'hiphop':
        currentPlaylist = hipHopPlaylist;
        // clearCanvas();
        playTunes('award tour');
        createConfettis(1);
        break;
      case 'funk':
        currentPlaylist = funkPlaylist;
        // clearCanvas();
        playTunes('get the funk out of');
        createConfettis(2);
        break;
      case 'rave':
        currentPlaylist = ravePlaylist;
        // clearCanvas();
        playTunes('haddaway what is love');
        createConfettis(3);
        break;
      default:
        break;
    }
  });

  function playTunes(theme) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: theme,
            type: 'track'
        },
        success: function (response) {
          if (response.tracks.items.length) {
              var track = response.tracks.items[0];
              audio.src = track.preview_url;
              audio.play();
          }
        }
    });
  }

  playTunes('award tour');
})
