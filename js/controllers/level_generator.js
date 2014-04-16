var LevelGenerator = function() {
  var layouts = [
    "ssssssSssssssssssPsssssssssssss",
    "ssssssoooooooooooossssss",
    "ssssssssssMsssssssssssssssss"
  ]

  this.startSegment = function(scene, offset) {
    var layout = layouts[0];
    return this.createSegment(layout, scene, offset);
  };

  this.randomSegment = function(scene, offset) {
    var layout = layouts[Math.floor(Math.random()*layouts.length)]
    return this.createSegment(layout, scene, offset);
  };

  this.createSegment = function(layout, scene, offset) {
    for(var i=0;i<layout.length;i++) {
      switch(layout[i]) {
        case "s":
          scene.add(new Block((i*40) + offset, 280));
          break;
        case "M":
          scene.add(new Block((i*40) + offset, 280));
          scene.add(new Obstacle((i*40) + offset, 245));
          break;
        case "P":
          scene.add(new Block((i*40) + offset, 280));
          scene.add(new Powerup((i*40) + offset, 100));
          break;
        case "S":
          scene.add(new Block((i*40) + offset, 280));
          scene.add(new Shoefiti((i*40) + offset, 130));
        default:
      }
    }

    return layout.length;
  };
};
