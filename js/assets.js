var Assets = function() {
  this.loaded = false;
  this.images = {};

  var imageUrls = [
    "graphics/sheet_6x1_color.png",
    "graphics/block.png",
    "graphics/harlem.png",
    "graphics/big_bg.gif",
    "graphics/mailbox.png",
    "graphics/powerup.png",
    "graphics/shoo.png",
    "graphics/game_over.png",
    "graphics/title.png",
    "graphics/interface.png",
    "graphics/vibes.png"
  ];

  var complete;

  this.init = function(callback) {
    complete = callback;
    var il = ImageLoader();
    il.load(imageUrls, onProgress, onComplete);
  }

  function onProgress(loaded, total) {
    //console.log("loaded", loaded, "out of", total);
  }

  function onComplete(images) {
    loaded = true;
    this.images = images;
    if(complete) {
      complete(this.images);
    }
  }

  return {
    init: this.init,
    images: this.images,
    loaded: this.loaded
  };
};
