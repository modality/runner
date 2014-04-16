var RunnerGraphics = function() {
  this.graphic = new pig.Sprite(this.x, this.y, "graphics/sheet_6x1_color.png", 83, 96);
  this.graphic.add("stand", [0]);
  this.graphic.add("run", [1, 2, 3, 4, 5, 6]);
  this.graphic.add("jump", [4, 5, 6, 1, 2, 3]); 
  this.graphic.add("invincible", [7, 8, 9, 10, 11, 12]);
  this.graphic.play("stand", 1);
  this.graphic.z = 5;

  this.updateGraphics = function(state, speed, dtime) {
    if(state == "jumping" || state == "falling") {
    } else if(speed > 0) {
      this.graphic.fps = ((speed * dtime) * 2)+5;
    } else if(speed == 0) {
      this.animStand();
    }

    this.graphic.place([this.x, this.y]);
  }

  this.animStand = function() {
    this.graphic.play("stand", 1);
  };

  this.animRun = function() {
    this.graphic.play("run", 16);
  };

  this.animJump = function() {
    this.graphic.play("jump", 4);
  };

  this.animInvincible = function() {
    this.graphic.play("invincible", 16);
  };
}
