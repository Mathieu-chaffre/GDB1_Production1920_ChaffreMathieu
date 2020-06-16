class Scene7 extends Phaser.Scene {
  constructor() {
    super({ key: 'septieme_scene', physics: {arcade: {
      debug: false,
      gravity: {
          y: 1000
      },
    }} });
  }

  init(data){
    this.compteur_echec= data.compteur_echec;
    this.score = data.score;
    this.reussis = data.reussis;
  }

  preload(){
    this.load.image("fond", "assets/fond_menu.png");
    this.load.multiatlas('boxe', 'assets/boxe.json', 'assets');
    this.load.multiatlas('boxe_stand', 'assets/boxe_stand.json', 'assets');
    this.load.multiatlas('punching_ball', 'assets/punching_ball.json', 'assets');
    this.load.multiatlas("boom", "assets/boom.json", "assets");


  }

  create(){


    this.fond = this.add.image(0,0, "fond").setOrigin(0,0);


    function Punching_ball(scene, x, y, texture){
      Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, texture);
      scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.coups = 0;
      this.attaque = 0;
      this.esquive = 0;
      this.setInteractive();
    };

    Punching_ball.prototype = Object.create(Phaser.Physics.Arcade.Sprite.prototype);
  Punching_ball.prototype.constructor = Punching_ball;




    this.punching_ball = new Punching_ball(this,585, 500, "punching_ball", "punchin_ball001.png").setScale(0.7).setSize(220, 470).setOffset(200, 0).setFlipX(true);


    function Perso(scene, x, y, texture){
      Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, texture);
      scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.touche = 0;
      this.attaque = 0;

    };

    Perso.prototype = Object.create(Phaser.Physics.Arcade.Sprite.prototype);
  Perso.prototype.constructor = Perso;


    this.perso = new Perso(this,400, 500, "boxe", "boxe001.png");








    this.frameName = this.anims.generateFrameNames('boxe', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'boxe00', suffix: '.png'
                       });

    this.anims.create({ key: 'boxe', frames: this.frameName, frameRate: 40, repeat: 0 });

    this.frameName_stand = this.anims.generateFrameNames('boxe_stand', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'boxe_stand_00', suffix: '.png'
                       });

    this.anims.create({ key: 'boxe_stand', frames: this.frameName_stand, frameRate: 40, repeat: -1 });






    this.frameName_punching = this.anims.generateFrameNames('punching_ball', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'punching_ball00', suffix: '.png'
                       });

    this.anims.create({ key: 'punching_ball', frames: this.frameName_punching, frameRate: 40, repeat: 0 });


    this.frameName_boom = this.anims.generateFrameNames('boom', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'boom_00', suffix: '.png'
                       });

    this.anims.create({ key: 'boom', frames: this.frameName_boom, frameRate: 35, repeat: -1 });

    this.perso.anims.play('fly', true);




    this.perso.anims.play("boxe_stand");
    this.perso.setFlipX(true);

    this.perso.setCollideWorldBounds(true);
    this.punching_ball.setCollideWorldBounds(true);

    this.punching_ball.on("pointerdown", this.Attaque, this);
    this.punching_ball.on("pointerup", this.EndAttaque, this);

    this.perso.on('animationcomplete', () => {
        this.perso.anims.play('boxe_stand');
    });

    this.punching_ball.on('animationcomplete', () => {
        this.punching_ball.esquive = 0;

    });

    this.save_x = this.perso.x;
    this.save_pointer = 0;
    this.swipe = false;

    this.input.on('pointerdown', this.PointerDown, this);

    this.input.on('pointerup', this.PointerUp, this);

    this.input.on('pointermove', this.Pointermove, this);


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
          else {
            this.scene.start("sixieme_scene", {score: this.score});
          }
      }

      this.text = this.add.text(200, 250, "Détrui le punching-ball ! ", {fontSize: '50px', fill: 'white', fontStyle: "bold"} );
      this.time.delayedCall(2000, ()=> {
        this.text.visible = false;
      });





  }

  update(){
console.log(this.perso.attaque);
if (this.initialTime == 5) {
  this.timer.setTexture("timer_jaune");
}
else if (this.initialTime == 2) {
  this.timer.setTexture("timer_rouge");
}








  }

  Attaque(){
    if (this.perso.touche == 0 && this.punching_ball.coups < 5) {
      this.perso.attaque = 1;
      this.punching_ball.coups +=1;
      console.log(this.punching_ball.coups);
      this.perso.anims.play("boxe");
      this.punching_ball.attaque = Phaser.Math.Between(1,2);
      if (this.punching_ball.attaque == 1) {
        this.time.delayedCall(200, ()=> {
          if (this.punching_ball.coups < 5 ) {
            this.punching_ball.anims.play("punching_ball");
            this.time.delayedCall(300, ()=> {
              this.punching_ball.esquive = 1;
              if (this.perso.touche == 0) {
                this.scene.start("sixieme_scene", {score: this.score});
              }
            });
          }


        });
      }
    }
    if (this.punching_ball.coups == 5) {
      this.score += 10*this.initialTime;
      this.punching_ball.setFlipX(false);
      this.punching_ball.anims.play("boom");
      this.time.delayedCall(1000, ()=> {
        this.scene.start("sixieme_scene", {score: this.score});
      });



  }


  }

EndAttaque(){

    this.perso.attaque = 0;
  }



  PointerDown(pointer){
    this.swipe = true;
    this.save_pointer = pointer.x;
  }

  PointerUp(pointer){
    this.swipe = false;
    this.perso.x = this.save_x;
    this.perso.touche = 0;
  }

  Pointermove(pointer){
    if (this.swipe && this.perso.attaque == 0 ) {

      if (pointer.x < this.save_pointer) {
        this.perso.x = 250;

        this.perso.touche = 1;
      }

    }




  }

}
