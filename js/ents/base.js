var Base = function(x, y) {
  pig.Entity.apply(this);

  this.x = x;
  this.y = y;
  this.v_x = 0;
  this.v_y = 0;

  this.rect = new pig.Rect(this.x, this.y, 0, 0);

  this.updateRect = function() {
    this.rect.x = this.x;
    this.rect.y = this.y;
  };
};
