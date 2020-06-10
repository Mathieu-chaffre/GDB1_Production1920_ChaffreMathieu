var config = {
  width: 1280,
  height: 720,
  parent: "game-container",
  physics: {
        default: 'matter',
        matter: {
          debug: true,
          gravity: {
              y: 1
          },
        }
    },
    scene: [Scene5]
  }

var game = new Phaser.Game(config);
