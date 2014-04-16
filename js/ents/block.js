var Block = function(x, y) {
  Base.call(this, x, y);

  this.type = "block";
  this.z = 0;

  this.graphic = new pig.Image(this.x, this.y, "graphics/block.png")
  this.graphic.z = 0;

  this.rect.x = x;
  this.rect.y = y + 20;
  this.rect.w = 40;
  this.rect.h = 20;

  this.updateRect = function() {
    this.rect.x = this.x;
    this.rect.y = this.y+20;
  };

  this.update = function(dtime) {
    this.v_x = -pig.world.getSpeed();
    if(this.v_x != 0) {
      this.x = this.x + (this.v_x * dtime);
      this.updateRect();
      if(this.rect.right() > -100) {
        var y_mod = 80 * (pig.world.getElevation() / pig.canvas.height);
        this.graphic.place([this.x, this.y + y_mod]);
      } else {
        pig.world.remove(this);
      }
    }
  };

}
