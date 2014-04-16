var Background = function() {
  pig.Entity.apply(this);

  var sky = {}, buildings = {};

  sky.img = pig.images["graphics/big_bg.gif"];
  sky.x = 0;
  sky.y = -70;
  sky.speed = 0.4;

  buildings.img = pig.images["graphics/harlem.png"];
  buildings.x = 0;
  buildings.y = 110;
  buildings.speed = 0.6;

  this.update = function(dtime) {
    sky.x -= pig.world.getSpeed() * dtime * sky.speed;
    while(sky.x < -sky.img.width) {
      sky.x += sky.img.width;
    }

    buildings.x -= pig.world.getSpeed() * dtime * buildings.speed;
    while(buildings.x < -buildings.img.width) {
      buildings.x += buildings.img.width;
    }
  }

  this.draw = function() {
    if(pig.context) {
      var paint_x, y_mod;

      y_mod = 40 * (pig.world.getElevation() / pig.canvas.height);
      paint_x = sky.x;
      while(paint_x < pig.canvas.width) {
        pig.context.drawImage(sky.img, paint_x, sky.y+y_mod);
        paint_x += sky.img.width;
      }

      y_mod = 60 * (pig.world.getElevation() / pig.canvas.height);
      paint_x = buildings.x;
      while(paint_x < pig.canvas.width) {
        pig.context.drawImage(buildings.img, paint_x, buildings.y+y_mod);
        paint_x += buildings.img.width;
      }
    }
  };
}
