class Scene4 extends Phaser.Scene {
  constructor() {
    super("quatrieme_scene");
  }

  init(data){
    this.compteur_echec= data.compteur_echec;
    this.score = data.score;
  }

  preload(){
    this.load.image("landscape_skate", "assets/landscape_skate.png");
    this.load.multiatlas('skate_avance', 'assets/skate_avance.json', 'assets');
    this.load.image("bouton_tricks", "assets/bouton_tricks.png");
    this.load.multiatlas("skate_tricks", "assets/skate_tricks_1.json", "assets");
    this.load.multiatlas("skate_tricks_2", "assets/skate_trick_2.json", "assets");
    this.load.image("timer_vert", "assets/button_timer_vert.png");
    this.load.image("timer_jaune", "assets/button_timer_jaune.png");
    this.load.image("timer_rouge", "assets/button_timer_rouge.png");


  }

  create(){
    this.scene_compte = 2;



    this.rand_number = 0;
    this.add.image(0,0, "landscape_skate").setOrigin(0,0);
    this.text = this.add.text(150, 475, "Réalise des tricks ! ", {fontSize: '75px', fill: 'white', fontStyle: "bold"});
    this.perso = this.matter.add.sprite(20, 80, 'skate_avance', 'skate_avance_001.png');
    this.perso.setScale(0.7);

      this.cameras.main.setBounds(0, 0, 5120, 650);
      this.cameras.main.startFollow(this.perso, true);
      this.matter.world.setBounds(0, 0,5120, 680);
      this.perso.setFlipX(true);

      function Bouton(scene, x, y, texture){
        Phaser.Physics.Arcade.Image.call(this, scene, x, y, texture);
        scene.add.existing(this);
        this.setInteractive();
        this.toucher = 0;
      };

      Bouton.prototype = Object.create(Phaser.Physics.Arcade.Image.prototype);
    Bouton.prototype.constructor = Bouton;

      this.bouton_tricks = new Bouton(this, 120, 200, "bouton_tricks");
      this.bouton_tricks.visible = false;







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
              this.score += 10;
              this.reussis = 1;
              this.scene.start("troisieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte, score : this.score, reussis: this.reussis});

            }

        }







      this.frameName_skate_avance = this.anims.generateFrameNames('skate_avance', {
                             start: 1, end: 30, zeroPad: 1,
                             prefix: 'skate_avance_00', suffix: '.png'
                         });

      this.anims.create({ key: 'skate_avance', frames: this.frameName_skate_avance, frameRate: 40, repeat: -1 });






      this.frameName_skate_trick = this.anims.generateFrameNames('skate_tricks', {
                             start: 1, end: 30, zeroPad: 1,
                             prefix: 'skate_trick_100', suffix: '.png'
                         });

      this.anims.create({ key: 'skate_tricks', frames: this.frameName_skate_trick, frameRate: 40, repeat: -1 });

      this.frameName_skate_trick_2 = this.anims.generateFrameNames('skate_tricks_2', {
                             start: 1, end: 30, zeroPad: 1,
                             prefix: 'skate_tricks_200', suffix: '.png'
                         });

      this.anims.create({ key: 'skate_tricks_2', frames: this.frameName_skate_trick_2, frameRate: 40, repeat: -1 });




      this.perso.anims.play("skate_avance", true);


      this.timedEvent = this.time.addEvent({ delay: 3000, callback: onEvent, callbackScope: this, repeat: -1 });
      function onEvent(){

        console.log("fait visible");
        this.rand_x = Phaser.Math.Between(this.perso.x-150, this.perso.x+600);
        this.rand_y = Phaser.Math.Between(this.perso.y-450, this.perso.y);
        this.bouton_tricks.setPosition(this.rand_x, this.rand_y);
        this.bouton_tricks.visible = true;
        console.log(this.bouton_tricks.y);
        console.log(this.bouton_tricks.x);
        console.log(this.perso.x);

        this.time.delayedCall(800, ()=> {
          console.log(this.bouton_tricks.toucher);
          this.bouton_tricks.visible = false;
          if (this.bouton_tricks.toucher == 0) {

            this.compteur_echec -=1;
            this.reussis = 0;
            this.scene.start("troisieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte, score: this.score, reussis:this.reussis});


          }
        });

      };


      this.bouton_tricks.on("pointerdown", this.HitBouton, this);




  }

  update(){
    this.perso.setVelocityX(2.5);
    if (this.initialTime == 6) {
      this.timer.setTexture("timer_jaune");
    }
    else if (this.initialTime == 3) {
      this.timer.setTexture("timer_rouge");
    }




  }

  HitBouton(){

    this.rand_number = Phaser.Math.Between(1,2);
    this.bouton_tricks.toucher = 1;
    if (this.rand_number == 1) {
      this.perso.anims.play("skate_tricks");

      this.time.delayedCall(800, ()=> {
        this.perso.anims.play("skate_avance");

      });

    }
    else if (this.rand_number == 2) {
      this.perso.anims.play("skate_tricks_2");
      this.time.delayedCall(500, ()=> {
        this.perso.anims.play("skate_avance");

      });
    }

    this.time.delayedCall(800, ()=> {
      this.bouton_tricks.toucher = 0;

    });


  }


}
