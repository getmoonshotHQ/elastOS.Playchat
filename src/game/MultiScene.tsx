import * as Phaser from "phaser"

export default class MultiScene extends Phaser.Scene {
    constructor() {
        super("MultiScene");
    }

    preload() {
      
    }

    create() {
      this.add.sprite(80, 0, "Sprite");
    }
}