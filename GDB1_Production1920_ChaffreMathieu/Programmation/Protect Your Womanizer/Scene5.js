class Scene5 extends Phaser.Scene {
  constructor() {
    super("cinquieme_scene")
  }

  init(data){
    this.compteur_echec= data.compteur_echec;
  }

  preload(){
    this.load.image("landscape_dance", "assets/landscape_dance.png");
  }

  create(){

    this.land_scape = this.add.image(0,0, "landscape_dance").setOrigin(0,0);

  }


  update(){


  }
}
