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
  hiphopBackground();

  waveChart('w-hiphop', .5);
  waveChart('w-rock', .3);
  waveChart('w-funk', .8);
  waveChart('w-dance', .1);

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
        displayVotes(rockPlaylist);
        break;
      case 'hiphop':
        hipHopPlaylist.vote(data.votes);
        displayVotes(hipHopPlaylist);
        break;
      case 'funk':
        funkPlaylist.vote(data.votes);
        displayVotes(funkPlaylist);
        break;
      case 'dance':
        dancePlaylist.vote(data.votes);
        displayVotes(dancePlaylist);
        break;
      default:
        console.log('meh')
    }
  });

  socket.on('changeApproaching', function(data) {
    console.log("OMG we're about to change to " + data.type);
  });

  socket.on('changeTheme', function(data) {
    console.log('changing theme to ' + data.type);

    switch(data.type) {
      case 'rock':
        playTunes('highway to hell');
        break;
      case 'hiphop':
        playTunes('grown up');
        break;
      case 'funk':
        playTunes('get the funk out of');
        break;
      case 'rave':
        playTunes('andy c');
        break;
      default:
        break;
    }
  });

  function displayVotes(playlist){
    var loaderDiv = document.getElementsByClassName('counter')[playlist.index];
    var loaderContainer = document.getElementsByClassName('music-block')[playlist.index];
    var containerHeight = loaderContainer.offsetHeight;
    var height = loaderDiv.offsetHeight;
    var newHeight = height * playlist.votes;
    // if(parseInt(newHeight) <= parseInt(containerHeight)){
    //   loaderDiv.style.height = newHeight + 'px'
    // }
  }

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
