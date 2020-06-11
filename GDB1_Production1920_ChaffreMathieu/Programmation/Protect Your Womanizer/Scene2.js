class Scene2 extends Phaser.Scene {
  constructor() {

    //test de plusieurs moteurs physics
    super({ key: 'deuxieme_scene', physics: {matter: {
      debug: true,
      gravity: {
          y: 0.2
      },
    }} });


  }



    init(data){
      this.compteur_echec = data.compteur_echec;
    }

  preload(){
    this.load.image("landscape_parachute", "assets/landscape_parachute.png");
    this.load.image("test", "assets/bouton_tricks.png");
    this.load.image("immeuble", "assets/immeuble.png");
    this.load.multiatlas('parachute', 'assets/parachute.json', 'assets');
    this.load.multiatlas("boom", "assets/boom.json", "assets");
    this.load.image("timer_vert", "assets/button_timer_vert.png");
    this.load.image("timer_jaune", "assets/button_timer_jaune.png");
    this.load.image("timer_rouge", "assets/button_timer_rouge.png");


  }

  create(){
    this.scene_compte = 1;
    this.fond = this.add.image(0,0, "landscape_parachute").setOrigin(0,0);

    this.text = this.add.text(50, 1280, "Pose ton dragueur !", {fontSize: '100px', fill: 'black', fontStyle: "bold"});



    this.perso = this.matter.add.sprite(500, 400, 'parachute', 'parachute_1.png').setInteractive();
    this.perso.setScale(0.7);

    this.perso.body.label = "perso";


    this.frameName = this.anims.generateFrameNames('parachute', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'parachute_', suffix: '.png'
                       });

    this.anims.create({ key: 'fly', frames: this.frameName, frameRate: 40, repeat: -1 });


    this.frameName_boom = this.anims.generateFrameNames('boom', {
                           start: 1, end: 30, zeroPad: 1,
                           prefix: 'boom_00', suffix: '.png'
                       });

    this.anims.create({ key: 'boom', frames: this.frameName_boom, frameRate: 35, repeat: -1 });

    this.perso.anims.play('fly', true);





    this.immeuble = this.matter.add.image(1353, 3409, "immeuble", null, { isStatic: true });
    this.cameras.main.setBounds(0, 0, 1280, 4320);
      this.cameras.main.startFollow(this.perso, true);
      this.matter.world.setBounds(0, 0,1280, 4320);

      this.input.setDraggable(this.perso);


      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;

    });

    this.immeuble.body.label = "immeuble";



    this.matter.world.on('collisionstart', function (event) {
        for (var i = 0; i < event.pairs.length; i++) {
            var bodyA = getRootBody(event.pairs[i].bodyA);
            var bodyB = getRootBody(event.pairs[i].bodyB);
            console.log(bodyA);

            if ((bodyA.label === 'perso' && bodyB.label === 'immeuble') || (bodyB.label === 'immeuble' && bodyA.label === 'perso')) {
              if (this.perso.y < 2415) {
                this.scene.start("troisieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte});

              }
            }
        }
    }, this);

function getRootBody(body) {
    if (body.parent === body) {
        return body;
    }
    while (body.parent !== body) {
        body = body.parent;
    }
    return body;
  }




  var text;
  var timedEvent;

    this.initialTime = 5;
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
    }


  }

  update(){

    if (this.perso.y >= 4105) {
      this.perso.anims.play('boom', true);
      this.perso.y = 4105;
      this.time.delayedCall(2000, ()=> {
        this.compteur_echec -=1;
        this.scene.start("troisieme_scene", {compteur_echec: this.compteur_echec, scene_compte: this.scene_compte});

      });

    }
    if (this.initialTime == 5) {
      this.timer.setTexture("timer_jaune");
    }
    else if (this.initialTime == 2) {
      this.timer.setTexture("timer_rouge");
    }



  }


}
