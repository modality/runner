var Interface = function() {
  pig.Entity.apply(this);

  var state = "";
  var powerups = 0;
  var speed = 0;
  var score = 0;
  var highScore = 0;

  var invincible = false;
  var invincible_pct = 0;

  var scoreText = $(".distance");
  var highScoreText = $(".high-score");
  var finalScoreText = $(".final-score");

  var score_graphic = new pig.Image(0, 0, "graphics/interface.png");
  score_graphic.z = 100;

  var image_graphic = new pig.Image(0, 0, "graphics/title.png");
  image_graphic.z = 100;

  var game_over_graphic = new pig.Image(0, 0, "graphics/game_over.png");
  game_over_graphic.z = 100;

  this.getState = function() {
    return state;
  };

  this.showTitle = function() {
    state = "title";
    this.graphic = image_graphic;
    scoreText.hide();
    highScoreText.hide();
    finalScoreText.hide();
  };

  this.showScore = function() {
    if(state != "score") {
      state = "score";
      this.graphic = score_graphic;
      scoreText.show();
      highScoreText.hide();
      finalScoreText.hide();
    }
  };

  this.showGameOver = function() {
    state = "game over";
    this.graphic = game_over_graphic;
    scoreText.hide();
    highScoreText.show();
    finalScoreText.show();
  };

  this.updateInterface = function(_powerups, _speed, _score, _invincible, _invincible_pct, _highScore) {
    powerups = _powerups;
    speed = _speed;
    score = Math.round(_score);
    invincible = _invincible;
    invincible_pct = _invincible_pct;
    highScore = Math.round(_highScore);
  };

  var superDraw = this.draw;
  this.draw = function() {
    superDraw.apply(this, arguments);
    if(state == "score") {
      scoreText.text("Score: "+score);
      if(pig.context) {
        pig.context.fillStyle = '#FFFFFF';
        for(var i=0;i<8;i++) {
          if(i < speed * 8) {
            pig.context.fillRect(78+(i*14.5),21,12,13);
          }
        }

        var x = 44.5;
        var y = 45.5;
        var r = 23;
        var s = 1.5 * Math.PI;
        var radians = 0;

        if(!invincible) {
          radians = (powerups * 2 * Math.PI) / 4.0;
        } else {
          radians = invincible_pct * 2 * Math.PI;
        }

        if(radians > 0) {
          radians -= (0.5 * Math.PI);

          pig.context.beginPath();
          pig.context.fillStyle = "#FFFFFF";
          pig.context.moveTo(x, y);
          pig.context.arc(x, y, r, s, radians, false);
          pig.context.closePath();
          pig.context.fill();
        }
      }
    } else if (state == "game over") {
      finalScoreText.text("Final Score: "+score);
      highScoreText.text("High Score: "+highScore);
    }
  };
};
