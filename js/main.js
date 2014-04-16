var Main = function() {
  var game_controller; 

  pig.init('main-canvas');

  this.init = function() {
    var assets = new Assets();

    assets.init(function(images) {
      for(image in images) {
        images[image].valid = true;
      }
      pig.images = images;
      game_controller = new GameController();
      pig.world = game_controller;
      game_controller.reset();
      $(".high-score, .final-score").on("click", function() {
        game_controller.reset();
      });

      pig.canvas.addEventListener("touchstart", function(e) {
        game_controller.mouseDown.call(game_controller, e);
      }, false);

      pig.canvas.addEventListener("touchend", function(e) {
        game_controller.mouseUp.call(game_controller, e);
      }, false)

      pig.fps = 24;
      pig.run();
    });
  }

  return this;
}
