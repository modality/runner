var Runner = function(x, y) {
  Base.call(this, x, y);
  RunnerPhysics.call(this);
  RunnerGraphics.call(this);

  var collected = 0,
      invincibility = true,
      invincibilityTimer = 0,
      invincibilityMax = 5;

  this.type = "runner";

  this.update = function(dtime) {
    if(invincibilityTimer > 0) {
      invincibilityTimer -= dtime;
    } else {
      invincibility = false;
    }

    this.updateRect();
    this.updateSpeed(dtime);
    this.checkObjects(dtime);
    this.checkCollision(dtime);
    this.updateGraphics(this.state(), this.speed(), dtime);
  };

  this.updateRect = function() {
    this.rect.x = this.x + 16;
    this.rect.y = this.y + 6;
    this.rect.w = 52;
    this.rect.h = 85;
  };

  this.checkObjects = function(dtime) {
    var test_rect = this.rect;
    var powerups = pig.world.getType("powerup");
    var collect = 0;

    powerups.forEach(function(powerup) {
      if(test_rect.collideRect(powerup.rect)) {
        pig.world.remove(powerup);
        collect++;
      }
    });

    if(collect > 0) {
      this.collectPowerup(collect);
    }

    var obstacles = pig.world.getType("obstacle");
    var dead = false;
    obstacles.forEach(function(obstacle) {
      if(test_rect.collideRect(obstacle.rect)) {
        if(invincibility) {
          obstacle.destroyHilariously();
        } else {
          dead = true;
        }
      };
    });

    if(this.y >= pig.canvas.height - this.rect.h) {
      dead = true
    }

    if(dead) {
      pig.world.gameOver();
    }
  };

  this.powerupCount = function() {
    return collected;
  };

  this.collectPowerup = function(amount) {
    if(!invincibility) {
      collected += amount;
      if(collected >= 4) {
        collected -= 4;
        this.startInvincible();
      }
    } else {
      invincibilityTimer += amount * invincibilityMax / 4.0;
      if(invincibilityTimer >= invincibilityMax) {
        invincibilityTimer = invincibilityMax;
      }
    }
  };

  this.isInvincible = function() {
    return invincibility;
  };

  this.invinciblePct = function() {
    return invincibilityTimer / invincibilityMax;
  };

  this.startInvincible = function() {
    invincibility = true;
    invincibilityTimer = invincibilityMax;
    this.animInvincible();
  };

  this.run = function() {
    this.actRun();
    if(invincibility) {
      this.animInvincible();
    } else {
      this.animRun();
    }
  }

  this.jump = function() {
    this.actJump();
    if(invincibility) {
      this.animInvincible();
    } else {
      this.animJump();
    }
  };

  this.fall = function() {
    this.actFall();
    if(invincibility) {
      this.animInvincible();
    } else {
      this.animJump();
    }
  };
};
