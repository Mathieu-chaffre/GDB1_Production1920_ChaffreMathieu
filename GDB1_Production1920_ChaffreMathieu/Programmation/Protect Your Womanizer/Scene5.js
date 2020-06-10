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
    this.load.multiatlas('dance', 'assets/dance.json', 'assets');
  }

  create(){
    this.rand_number = 0;

    this.landscape = this.add.image(0,0, "landscape_dance").setOrigin(0,0);
    this.matter.world.setBounds(0, 0,1280, 720);

    this.test = this.make.sprite({
        x: 400,
        y: 300,
        key: 'mask',
        add: false
    });

    this.test.setInteractive();



    this.perso = this.matter.add.sprite(120,120, 'dance', "dance_perso_1001.png");

    this.frameName = this.anims.generateFrameNames('dance', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_100', suffix: '.png'
                       });

    this.anims.create({ key: 'danse', frames: this.frameName, frameRate: 40, repeat: -1 });

    this.perso.anims.play("danse", true);


    this.landscape.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);
    this.perso.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);


    this.input.on("pointermove", function(pointer, gameObjects){

        gameObjects[0].x = pointer.x;
        gameObjects[0].y = pointer.y;



    });




    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.Mouv,
      callbackScope: this,
      loop: true
    });


}


  update(){


  }


  Mouv(){
    this.randNumber = Phaser.Math.Between(1,2);

    switch (this.randNumber) {
      case 1:
      this.perso.setVelocityX(2);

        break;
        case 2:
        this.perso.setVelocityX(-2);
        break;

  }
}
}
