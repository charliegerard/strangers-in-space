$(document).ready(function(){
  var socket = io();
  var numberOfUsers = 0;
  var audio = new Audio();

  var rockPlaylist = new Playlist('rock', 0, 0);
  var hipHopPlaylist = new Playlist('hiphop', 0, 1);
  var funkPlaylist = new Playlist('funk', 0, 2);
  var dancePlaylist = new Playlist('dance', 0, 3);

  //Setup default playlist, if needed;
  var defaultPlaylist = hipHopPlaylist;
  // hiphopBackground();
  // raveBackground();
  funkBackground();

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
      case 'dance':
        dancePlaylist.vote(data.votes);
        waveChart('w-dance', data.votes/10);
        break;
      default:
        break;
    }
  });

  function clearCanvas(){
    var canvas = document.getElementById('c').remove();
    // var context = canvas.getContext('2d');
    // context.clearRect(0,0,window.innerWidth, window.innerHeight);
  }

  socket.on('changeApproaching', function(data) {
    console.log("OMG we're about to change to " + data.type);
  });

  socket.on('changeTheme', function(data) {
    console.log('changing theme to ' + data.type);

    switch(data.type) {
      case 'rock':
        clearCanvas();
        rockBackground();
        playTunes('highway to hell');
        break;
      case 'hiphop':
        clearCanvas();
        hiphopBackground();
        playTunes('grown up');
        break;
      case 'funk':
        clearCanvas();
        funkBackground();
        playTunes('get the funk out of');
        break;
      case 'rave':
        clearCanvas();
        raveBackground();
        playTunes('andy c');
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
          console.log('playing song');
            if (response.tracks.items.length) {
                var track = response.tracks.items[0];
                audio.src = track.preview_url;
                audio.play();
            }
        }
    });
  }

  playTunes('grown up');
})
