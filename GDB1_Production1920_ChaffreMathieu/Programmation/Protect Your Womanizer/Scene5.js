class Scene5 extends Phaser.Scene {
  constructor() {
    super({ key: 'cinquieme_scene', physics: {arcade: {
      debug: true,
      gravity: {
          y: 200
      },
    }} });
  }

  init(data){
    this.compteur_echec= data.compteur_echec;
  }

  preload(){
    this.load.image("landscape_dance", "assets/landscape_dance.png");
    this.load.image("mask", "assets/mask.png");
    this.load.multiatlas('dance', 'assets/dance.json', 'assets');
    this.load.multiatlas('dance_2', 'assets/perso_dance_2.json', 'assets');
  }

  create(){
    this.rand_number = 0;
    var toucher = 0;
    this.touche =0;
    this.point = 0;

    this.physics.world.setBounds(0, 0, 1280, 720);

    this.landscape = this.add.image(0,0, "landscape_dance").setOrigin(0,0);
    this.monde = this.physics.world.setBounds(0, 0,1280, 720);

    this.test = this.make.sprite({
        x: 400,
        y: 300,
        key: 'mask',
        add: false
    });

    this.test.setInteractive();



     var perso = this.physics.add.sprite(800,10, 'dance', "dance_perso_1001.png");

    this.frameName = this.anims.generateFrameNames('dance', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_100', suffix: '.png'
                       });

    this.anims.create({ key: 'danse', frames: this.frameName, frameRate: 40, repeat: -1 });

    perso.anims.play("danse", true);

    this.perso_2 = this.physics.add.sprite(120,10, 'dance_2', "perso_dance_2001.png");



    this.frameName = this.anims.generateFrameNames('dance_2', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_200', suffix: '.png'
                       });

    this.anims.create({ key: 'danse_2', frames: this.frameName, frameRate: 40, repeat: -1 });

    this.perso_2.anims.play("danse_2");



    this.landscape.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);
     perso.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);
    this.perso_2.mask = new Phaser.Display.Masks.BitmapMask(this, this.test);


    this.input.on("pointermove", function(pointer, gameObjects){

        gameObjects[0].x = pointer.x;
        gameObjects[0].y = pointer.y;
        if (pointer.x <= perso.x+150 && pointer.x >= perso.x-150 ) {
          if (pointer.y <= perso.y+150 && pointer.y >= perso.y-150 ) {
            toucher = 1;
            console.log(toucher);

          }
        }
        else{
          toucher= 0;
        }



    });



    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: tets,
      callbackScope: this,
      loop: true
    });

    function tets(){
      this.touche = toucher;
      console.log(this.touche);
    }






    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: mouv,
      callbackScope: this,
      loop: true
    });

    function mouv(){
      this.randNumber = Phaser.Math.Between(1,2);

      switch (this.randNumber) {
        case 1:
        this.perso_2.setVelocityX(-200);
        perso.setVelocityX(200);

          break;
          case 2:
          perso.setVelocityX(-200);
          this.perso_2.setVelocityX(200);
          break;

    }
  }


  perso.setCollideWorldBounds(true);
  this.perso_2.setCollideWorldBounds(true);

  perso.setSize(200,458);



}


  update(){
    if (this.touche == 1) {
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.gagnePoint,
        callbackScope: this,
        loop: true
      });
      console.log("point" + this.point);
    }



  }

  gagnePoint(){
    this.point +=1;
  }

Test(){
  console.log("touché");
}

}
