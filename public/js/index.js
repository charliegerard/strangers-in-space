window.onload = function(){
  var socket = io();
  var numberOfUsers = 0;

  var rockPlaylist = new Playlist('rock', 0, 0);
  var hipHopPlaylist = new Playlist('hiphop', 0, 1);
  var funkPlaylist = new Playlist('funk', 0, 2);
  var dancePlaylist = new Playlist('dance', 0, 3);

  //Setup default playlist, if needed;
  var defaultPlaylist = rockPlaylist;

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
}
