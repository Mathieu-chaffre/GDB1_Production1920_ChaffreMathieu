class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'troisieme_scene', physics: {arcade: {
      debug: true,
      gravity: {
          y: 200
      },
    }} });
  }

  init(data){
    this.compteur_echec = data.compteur_echec;
    this.scene_compte = data.scene_compte;
    this.score = data.score;
    this.reussis = data.reussis;
  }

  preload(){
    this.load.image("fond", "assets/fond_menu.png");
    this.load.image("coeur", "assets/coeur_scene_transition.png");
    this.load.image("pause", "assets/bouton_pause.png");
    this.load.image("pause_presse", "assets/bouton_pause_press.png");
    this.load.audio('applause', "assets/applause.ogg");
    this.load.audio('boo', "assets/boo.ogg");

  }

  create(){
    this.sound.add('applause');
    this.sound.add('boo');

    this.pause_ = 1;
    this.add.image(0,0, "fond").setOrigin(0,0);
    this.add.image(641, 339, "coeur");

    function Bouton(scene, x, y, texture){
      Phaser.Physics.Arcade.Image.call(this, scene, x, y, texture);
      scene.add.existing(this);
      this.setInteractive();
      this.pause= 1;
    };

    Bouton.prototype = Object.create(Phaser.Physics.Arcade.Image.prototype);
  Bouton.prototype.constructor = Bouton;
    this.bouton_pause = new Bouton(this,1211,64,"pause");

    this.bouton_pause.on("pointerdown", this.Pause, this);





    this.text = this.add.text(410, 480, "x"+ this.compteur_echec, {fontSize: '100px', fill: 'white', fontStyle: "bold"});


    this.timedEvent = this.time.addEvent({ delay: 4000, callback: onEvent, callbackScope: this, repeat: -1 });
    function onEvent(){
      if (this.bouton_pause.pause == 1) {
        if (this.scene_compte == 1) {
          this.scene.start("quatrieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
        }
        else if (this.scene_compte == 2) {
          this.scene.start("cinquieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
        }

      }
    };

    console.log(this.reussis)
    if (this.reussis == 1) {
      this.sound.play('applause', {volume: 1});
    }
    else {
      this.sound.play("boo", {volume: 0.8});
    }


  }

  update(){




  }

  Pause(){
    if (this.bouton_pause.pause == 1) {
      this.physics.pause();
      this.bouton_pause.pause = 0;
      this.bouton_pause.setTexture("pause_presse");
    }
    else if (this.bouton_pause.pause == 0) {
        this.physics.resume();
        this.bouton_pause.pause = 1;
        this.bouton_pause.setTexture("pause");
    }
  }



}
