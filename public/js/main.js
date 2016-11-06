$( document ).ready(function() {
    console.log( "ready!" );
    /* Available backgrounds:
      raveBackground();
      hiphopBackground();
      funkBackground();
      rockBackground();
    */


    // raveBackground();
    // hiphopBackground();
    funkBackground();
    // rockBackground();


    waveChart('w-hiphop', .5);
    waveChart('w-rock', .3);
    waveChart('w-funk', .8);
    waveChart('w-dance', .1);

});
