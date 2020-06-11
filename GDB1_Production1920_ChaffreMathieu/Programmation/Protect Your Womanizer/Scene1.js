
class Scene1 extends Phaser.Scene {
  constructor() {
    super("premiere_scene");
  }

  init(){

  }

  preload(){
    this.load.image("fond", "assets/fond_menu.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("play", "assets/bouton_play.png");
    this.load.image("pointover", "assets/bouton_play_2.png");
    this.load.audio('theme', "assets/son_menu.ogg");

  }

  create(){
    this.sound.add('theme');


    this.add.image(0,0, "fond").setOrigin(0,0);
    this.add.image(639, 234, "logo");
    this.button = this.add.image(639,576, "play").setInteractive();

    this.input.on("pointerover", function(event, gameObjects){

        gameObjects[0].setTexture("pointover");


    });

    this.input.on('pointerout', function (event, gameObjects) {

        gameObjects[0].setTexture("play");


    });


    this.button.on("pointerdown", this.Click, this);

    this.compteur_echec = 3;
    this.score = 0;
    this.reussis = 0;


  this.sound.play('theme', {volume: 0.2});




  }

  update(){



  }

  Click(){
    this.scene.start("deuxieme_scene", {compteur_echec: this.compteur_echec, score: this.score});
  }

}
