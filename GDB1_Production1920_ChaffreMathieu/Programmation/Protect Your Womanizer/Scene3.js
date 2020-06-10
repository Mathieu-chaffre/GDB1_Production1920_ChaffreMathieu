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
  }

  preload(){
    this.load.image("fond", "assets/fond_menu.png");
    this.load.image("coeur", "assets/coeur_scene_transition.png");
    this.load.image("pause", "assets/bouton_pause.png");
    this.load.image("pause_presse", "assets/bouton_pause_press.png");

  }

  create(){
    this.pause_ = 1;
    this.add.image(0,0, "fond").setOrigin(0,0);
    this.physics.add.image(100,100, "pause");
    this.add.image(641, 339, "coeur");
    this.pause = this.add.image(1211,64, "pause").setInteractive();
    this.pause_2 = this.add.image(1211, 64, "pause_presse").setInteractive();
    this.pause_2.visible = false;
    this.text = this.add.text(410, 480, "x"+ this.compteur_echec, {fontSize: '100px', fill: 'white', fontStyle: "bold"});



    this.pause.on("pointerdown", this.Test, this);
    this.pause_2.on("pointerdown", this.Unpause, this);

    this.timedEvent = this.time.addEvent({ delay: 3000, callback: onEvent, callbackScope: this, repeat: -1 });
    function onEvent(){
      if (this.pause_ == 1) {
        this.scene.start("quatrieme_scene", {compteur_echec: this.compteur_echec});
      }
    };


  }

  update(){
    console.log(this.pause_);



  }

  Test(){
    this.pause_ = 0;
    this.physics.pause();
    console.log("pause");
    this.pause_2.visible = true;
    this.pause.visible = false;
  }

  Unpause(){
    this.pause_ = 1;
    this.physics.resume(true);
    this.pause_2.visible = false;
    this.pause.visible = true;
  }

}
