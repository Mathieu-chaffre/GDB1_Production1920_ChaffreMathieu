class Scene6 extends Phaser.Scene {
  constructor() {
    super("sixieme_scene");
  }

  init(data){
    this.score = data.score;
  }

  preload(){
    this.load.image("fond", "assets/fond_menu.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("play", "assets/bouton_play.png");
    this.load.image("pointover", "assets/bouton_play_2.png");

  }

  create(){

    this.add.image(0,0, "fond").setOrigin(0,0);
    this.add.image(639, 234, "logo");

    this.text = this.add.text(410,576,"Ton score est : " + this.score, {fontSize: '40px', fill:'white', fontStyle: "bold"});

    if (this.score > 30) {
      this.sound.play('applause', {volume: 1});
    }




  }

  update(){



  }

}
