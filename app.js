$(function () {
  var canvas = $("<canvas width='" + 500 + 
                 "' height='" + 500 + "'></canvas>");
  $('body').append(canvas);

  var ctx = canvas.get(0).getContext("2d");
  new Asteroids.Game(ctx).start();
});
