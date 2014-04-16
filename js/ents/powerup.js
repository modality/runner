var Powerup = function(x, y) {
  Base.call(this, x, y);

  this.type = "powerup";
  this.z = 7;

  this.graphic = new pig.Image(this.x, this.y, "graphics/powerup.png");

  this.updateRect = function() {
    this.rect.x = this.x;
    this.rect.y = this.y;
    this.rect.w = 40;
    this.rect.h = 40;
  };

  this.updateRect();

  this.update = function(dtime) {
    this.v_x = -pig.world.getSpeed();

    if(this.x < pig.canvas.width) this.v_x = this.v_x / 2.;

    if(this.v_x != 0) {
      this.x = this.x + (this.v_x * dtime);
      this.updateRect();
      if(this.rect.right() > -100) {
        this.graphic.place([this.x, this.y]);
      } else {
        pig.world.remove(this);
      }
    }
  };
}
