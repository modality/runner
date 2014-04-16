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

      pig.fps = 24;
      pig.run();
    });
  }

  return this;
}
