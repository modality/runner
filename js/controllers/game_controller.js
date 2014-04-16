var GameController = function() {
  pig.World.call(this);
  LevelGenerator.apply(this);

  var runner, bg, interface;
  var distanceTraveled, segmentMarker;
  var gameEnded, canReset;
  var highScore = 0;
  var spacebar = false;

  this.reset = function() {
    if(runner) this.remove(runner);
    if(bg) this.remove(bg);
    if(interface) this.remove(interface);

    var removeAll = function(o) { this.remove(o); };
    pig.world.getType("obstacle").forEach(removeAll, this);
    pig.world.getType("powerup").forEach(removeAll, this);
    pig.world.getType("block").forEach(removeAll, this);

    distanceTraveled = 0;
    segmentMarker = 0;
    canReset = false
    gameEnded = false;

    runner = new Runner(50, 174);
    bg = new Background();
    interface = new Interface();

    this.addSegment(true);
    this.add(runner);
    this.add(bg);
    this.add(interface);

    interface.showTitle();
  };

  var superUpdate = this.update;
  this.update = function(dtime) {
    if(segmentMarker - distanceTraveled < (pig.canvas.width + 100)) {
      this.addSegment();
    }

    if(!gameEnded) {
      distanceTraveled += this.getSpeed() * dtime;
      if(distanceTraveled > highScore) {
        highScore = distanceTraveled;
      }
    }

    interface.updateInterface(runner.powerupCount(), runner.speedPct(), distanceTraveled, runner.isInvincible(), runner.invinciblePct(), highScore);
    superUpdate.apply(this, arguments)
  };

  this.getSpeed = function() {
    return runner.speed();
  };
  
  this.getElevation = function() {
    return Math.max(pig.canvas.height - (runner.rect.bottom() + 20), 0);
  }

  this.mouseDown = function(event) {
    if(!gameEnded || interface.getState() == "title") {
      interface.showScore();
      if(runner.state() == "jumping") {
        runner.fall();
      } else {
        runner.run();
      }
    } else {
      this.reset();
    }
  };

  this.mouseUp = function(event) {
    if(runner.state() == "running") {
      runner.jump();
    }
  };

  this.keyDown = function(event) {
    if(pig.keysPressed[pig.key.SPACE]) {
      spacebar = true;
      this.mouseDown();
    }
  };

  this.keyUp = function(event) {
    if(!pig.keysPressed[pig.key.SPACE]) {
      pacebar = false;
      this.mouseUp();
    }
  }

  this.acceptInput = function() {
    return interface.getState() == "score" && (pig.mouse.pressed || spacebar);
  }

  this.gameOver = function() {
    interface.showGameOver();
    gameEnded = true;
  };


  this.addSegment = function(initial) {
    var offset = segmentMarker - distanceTraveled;
    var length = 0;

    if(initial) {
      length = this.startSegment(this, offset);
    } else { 
      length = this.randomSegment(this, offset);
    }

    segmentMarker += 40 * length;
  };
};
