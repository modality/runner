var Shoefiti = function(x, y) {
  Base.call(this, x, y);

  this.type = "obstacle";

  this.graphic = new pig.Sprite(this.x, this.y, "graphics/shoo.png", 300, 300);
  this.graphic.add("stand", [0]);
  this.graphic.play("stand", 1);
  this.graphic.z = 7;

  var destroying = false;
  var destroyTimer = 0;

  this.updateRect = function() {
    this.rect.x = this.x + 80;
    this.rect.y = this.y + 7;
    this.rect.w = 20;
    this.rect.h = 45;
  };

  this.updateRect();

  this.update = function(dtime) {
    if(destroying) {
      destroyTimer += dtime;

      if(destroyTimer > 0.5) {
        pig.world.remove(this);
      } else {
        this.graphic.scale = 1 + destroyTimer;
        this.graphic.place([this.x, this.y - (40*Math.sin(9.5 * destroyTimer))]);
      }

    } else {
      this.v_x = -pig.world.getSpeed();
      if(this.v_x != 0) {
        this.x = this.x + (this.v_x * dtime);
        this.updateRect();
        if(this.rect.right() > -120) {
          var y_mod = 80 * (pig.world.getElevation() / pig.canvas.height);
          this.graphic.place([this.x, this.y + y_mod]);
        } else {
          pig.world.remove(this);
        }
      }
    }
  };

  this.destroyHilariously = function() {
    this.graphic.z = 10;
    destroying = true;
  };
};

