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


    this.landscape.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);


    this.input.on("pointermove", function(pointer, gameObjects){

        gameObjects[0].x = pointer.x;
        gameObjects[0].y = pointer.y;



    });

  }


  update(){


  }
}
