var config = {
  width: 1280,
  height: 720,
  parent: "game-container",
  physics: {
        default: 'matter',
        matter: {
          debug: false,
          gravity: {
              y: 1
          },
        }
    },
    scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7]
  }

var game = new Phaser.Game(config);
