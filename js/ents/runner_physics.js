var RunnerPhysics = function() {
  // stopping, running, jumping, falling
  var _state = "falling",
      _speed = 0,
      accel = 1000,
      maxSpeed = 750,
      jumpVel = -800,
      gravity = 1800,
      fallVel = 500,
      fallAccel = 2500,
      fallMax = 1000;

  this.state = function() {
    return _state;
  };

  this.speed = function() {
    return _speed;
  };

  this.speedPct = function() {
    return _speed / maxSpeed;
  }

  this.actRun = function() {
    _state = "running";
  };
  
  this.actJump = function() {
    _state = "jumping";
    this.v_y = jumpVel * (_speed / maxSpeed);
  };

  this.actFall = function() {
    _state = "falling";
    this.v_y = fallVel;
  };

  this.updateSpeed = function(dtime) {
    if(_state == "running") {
      this.accelerate(dtime);
    } else if(_state == "stopping") {
      this.decelerate(dtime);
    } else if(_state == "jumping") {
      this.fallSlow(dtime);
    } else if(_state == "falling") {
      this.fallFast(dtime);
    }

    if(_state == "running" || _state == "stopping") {
      if(this.landed()) {
        this.v_y = 0;
      } else {
        this.fallSlow(dtime);
      }
    }
  };

  this.checkCollision = function(dtime) {
    if(_speed != 0) {
      this.tryMove(this.x + (_speed * dtime), this.y - 2, dtime);
    }

    if(this.v_y != 0) {
      this.tryFall(this.x, this.y + (this.v_y*dtime));
    }
  };

  this.decelerate = function(dtime) {
    _speed -= accel * dtime;
    if(_speed < 0) {
      _speed = 0;
    }
  };

  this.accelerate = function(dtime) {
    _speed += accel * dtime;
    if(_speed > maxSpeed) {
      _speed = maxSpeed;
    }
  };

  this.fallSlow = function (dtime) {
    this.v_y += gravity * dtime;
    if(this.v_y > fallMax) {
      this.v_y = fallMax;
    }
  };

  this.fallFast = function(dtime) {
    this.v_y += fallAccel * dtime;
    if(this.v_y > fallMax) {
      this.v_y = fallMax;
    }
  };

  this.tryMove = function(x, y, dtime) {
    var test_rect = new pig.Rect(x, y, this.rect.w, this.rect.h);

    var blocks = pig.world.getType("block");
    var canMove = true;
    var collideBlock = null;

    canMove = !blocks.some(function(block) {
      collideBlock = block;
      return test_rect.collideRect(block.rect);
    });

    if(!canMove && collideBlock) {
      _speed = ((collideBlock.x-1) - this.rect.right()) / dtime;
      if(_speed < 0) {
        _speed = 0;
      }
      this.v_y = 0;
      _state = "falling";
    }
  };

  this.landed = function(x, y) {
    var test_rect = this.rect;
    test_rect.x = this.x;
    test_rect.y = this.y + 1;

    var canFall = true;

    var blocks = pig.world.getType("block");
    var collideBlock = null;
    canFall = !blocks.some(function(block) {
      collideBlock = block;
      return test_rect.collideRect(block.rect);
    });

    if(this.y >= pig.canvas.height - test_rect.h) {
      canFall = true;
    }

    test_rect.x = this.x;
    test_rect.y = this.y;

    return !canFall;
  };

  this.tryFall = function(x, y) {
    var test_rect = this.rect;
    test_rect.x = x;
    test_rect.y = y;

    var canFall = true;

    if(this.v_y >= 0) {
      var blocks = pig.world.getType("block");
      var collideBlock = null;
      canFall = !blocks.some(function(block) {
        collideBlock = block;
        return test_rect.collideRect(block.rect);
      });

      if(!canFall && collideBlock) {
        this.y = collideBlock.rect.y - test_rect.h;
      }

      if(this.y >= pig.canvas.height - test_rect.h) {
        canFall = true;
      }
    }

    if(canFall) {
      this.x = x;
      this.y = y;
    } else {
      this.rect.x = this.x;
      this.rect.y = this.y;
      this.v_x = 0;
      this.v_y = 0;
      if(pig.world.acceptInput()) {
        _state = "running";
      } else {
        _state = "stopping";
      }
    }
  };
}
