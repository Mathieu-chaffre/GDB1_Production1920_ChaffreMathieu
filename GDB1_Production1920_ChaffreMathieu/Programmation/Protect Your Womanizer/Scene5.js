class Scene5 extends Phaser.Scene {
  constructor() {
    super("cinquieme_scene")
  }

  init(data){
    this.compteur_echec= data.compteur_echec;
  }

  preload(){
    this.load.image("landscape_dance", "assets/landscape_dance.png");
    this.load.image("mask", "assets/mask.png");
    this.load.multiatlas('perso_1', 'assets/dance_perso_1.json', 'assets');
  }

  create(){

    this.landscape = this.add.image(0,0, "landscape_dance").setOrigin(0,0);

    this.test = this.make.sprite({
        x: 400,
        y: 300,
        key: 'mask',
        add: false
    });

    this.test.setInteractive();

    this.perso = this.matter.sprite(120, 120, "dance_perso_dance_1.png");
    this.frameName = this.anims.generateFrameNames('parachute', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'parachute_', suffix: '.png'
                       });

    this.anims.create({ key: 'fly', frames: this.frameName, frameRate: 40, repeat: -1 });


    this.landscape.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);


    this.input.on("pointermove", function(pointer, gameObjects){

        gameObjects[0].x = pointer.x;
        gameObjects[0].y = pointer.y;



    });

  }


  update(){


  }
}
