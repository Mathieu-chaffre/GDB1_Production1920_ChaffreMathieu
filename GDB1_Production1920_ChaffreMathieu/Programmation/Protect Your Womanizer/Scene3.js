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

    //ajout des sons
    this.sound.add('applause');
    this.sound.add('boo');


    //mise en place fond et variable pause
    this.pause_ = 1;
    this.add.image(0,0, "fond").setOrigin(0,0);
    this.coeur = this.add.image(641, 339, "coeur");

    //ajout class bouton

    function Bouton(scene, x, y, texture){
      Phaser.Physics.Arcade.Image.call(this, scene, x, y, texture);
      scene.add.existing(this);
      this.setInteractive();
      this.pause= 1;
    };

    Bouton.prototype = Object.create(Phaser.Physics.Arcade.Image.prototype);
  Bouton.prototype.constructor = Bouton;
    this.bouton_pause = new Bouton(this,1211,64,"pause");

    //ajout interraction avec le bouton

    this.bouton_pause.on("pointerdown", this.Pause, this);




    //ajout compteur vie
    this.text = this.add.text(410, 480, "x"+ this.compteur_echec, {fontSize: '100px', fill: 'white', fontStyle: "bold"});

    //check si le pause est activé et si il ne l'est pas et passage aux autres scene (redistribution)
    this.timedEvent = this.time.addEvent({ delay: 4000, callback: onEvent, callbackScope: this, repeat: -1 });
    function onEvent(){
      if (this.bouton_pause.pause == 1 && this.compteur_echec > 0) {
        if (this.scene_compte == 1) {
          this.scene.start("quatrieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
        }
        else if (this.scene_compte == 2 && this.compteur_echec > 0) {
          this.scene.start("cinquieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
        }
        else if (this.scene_compte == 3 && this.compteur_echec > 0) {
          this.time.delayedCall(1000, ()=> {
            this.coeur.destroy(true);
             this.text.setText("Boss stage: Réutilise ce que tu as appris !");
             this.text.x = 180;
             this.text.y = 345;
             this.text.setFontSize("40px");
             this.time.delayedCall(2000, ()=> {
               this.scene.start("septieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
             });
          });



        }


      }
    };

    //ajout de son en fonction de la réaussite

    console.log(this.reussis)
    if (this.reussis == 1) {
      this.sound.play('applause', {volume: 1});
    }
    else {
      this.sound.play("boo", {volume: 0.8});
    }


  }

  update(){

    //ajout game over
    if (this.compteur_echec <= 0) {
      this.text.setText("Game over");
      this.text.y = 300;
      this.text.x = 375;
      this.coeur.destroy(true);
      this.bouton_pause.destroy(true);
    }




  }

//ajout focntion pause
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
