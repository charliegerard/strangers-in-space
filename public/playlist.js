class Playlist{
  constructor(type, counter, index){
    this.type = type;
    this.voteCounter = counter;
    this.index = index;
  }

  vote(votes){
    this.voteCounter = votes;
    return this.voteCounter;
  }

}
