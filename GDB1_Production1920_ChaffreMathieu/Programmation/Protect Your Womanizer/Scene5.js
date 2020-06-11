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
    this.load.multiatlas('dance_3', 'assets/dance_perso_3.json', 'assets');
  }

  create(){
    this.rand_number = 0;
    var toucher = 0;
    //this.touche =0;
    this.scene_compte = 3;
    this.point = 0;
    this.temps = 0;

    this.physics.world.setBounds(0, 0, 1280, 720);

    this.landscape = this.add.image(0,0, "landscape_dance").setOrigin(0,0);
    this.monde = this.physics.world.setBounds(0, 0,1280, 720);

    var lumiere = this.make.sprite({
        x: 400,
        y: 300,
        key: 'mask',
        add: false
    });




     var perso = this.physics.add.sprite(800,10, 'dance', "dance_perso_1001.png");

    this.frameName = this.anims.generateFrameNames('dance', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_100', suffix: '.png'
                       });

    this.anims.create({ key: 'danse', frames: this.frameName, frameRate: 40, repeat: -1 });

    perso.anims.play("danse", true);

    this.perso_2 = this.physics.add.sprite(120,10, 'dance_2', "perso_dance_2001.png");



    this.frameName_dance_2 = this.anims.generateFrameNames('dance_2', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_200', suffix: '.png'
                       });

    this.anims.create({ key: 'danse_2', frames: this.frameName_dance_2, frameRate: 40, repeat: -1 });

    this.perso_2.anims.play("danse_2");

    this.perso_3 = this.physics.add.sprite(200, 10, "dance_3", "dance_perso_3001.png");

    this.frameName_dance_3 = this.anims.generateFrameNames('dance_3', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'dance_perso_300', suffix: '.png'
                       });

    this.anims.create({ key: 'danse_3', frames: this.frameName_dance_3, frameRate: 40, repeat: -1 });

    this.perso_3.anims.play("danse_3");




    this.landscape.mask = new Phaser.Display.Masks.BitmapMask(this, lumiere);
     perso.mask = new Phaser.Display.Masks.BitmapMask(this, lumiere);
    this.perso_2.mask = new Phaser.Display.Masks.BitmapMask(this, lumiere);
    this.perso_3.mask = new Phaser.Display.Masks.BitmapMask(this, lumiere);


    this.input.on("pointermove", function(pointer, gameObjects){

        lumiere.x = pointer.x;
        lumiere.y = pointer.y;
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
      delay: 200,
      callback: point,
      callbackScope: this,
      loop: true
    });

    function point(){
      console.log("temps" + this.temps);
      if (this.temps == 0) {

        this.temps = 1;
        if (toucher == 1) {
          this.point +=1;
          console.log(this.point);
        }

        this.time.delayedCall(2000, ()=> {
          this.temps = 0;
        });
      }
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
  this.perso_3.setCollideWorldBounds(true);

  perso.setSize(200,458);


  var text;
  var timedEvent;

    this.initialTime = 10;
    this.timer = this.add.image(55,45, "timer_vert").setScrollFactor(0);


    text = this.add.text(32, 32,this.initialTime, {fontSize: '40px', fill:'white', fontStyle: "bold"}).setScrollFactor(0);


    timedEvent = this.time.addEvent({ delay: 1000, callback: onTimer, callbackScope: this, loop: true });

    function formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;

        partInSeconds = partInSeconds.toString().padStart(2,'0');
        return `${partInSeconds}`;
    }

    function onTimer ()
    {
        if(this.initialTime > 0){
                this.initialTime -= 1;
        text.setText(formatTime(this.initialTime));
        }
        if(this.initialTime <= 0){
          if (this.point >= 8) {
            this.scene.start("sixieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte});
          }
          else{
            this.compteur_echec -=1;
            this.scene.start("sixieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte});
          }


        }

    }



}


  update(){
    /*console.log("temps" + this.temps);
    if (this.temps == 0) {

      this.temps = 1;
      if (toucher == 1) {
        this.point +=1;
      }

      this.time.delayedCall(2000, ()=> {
        this.temps = 0;
      });
    }*/



  }

  gagnePoint(){
    this.point +=1;
  }


}
