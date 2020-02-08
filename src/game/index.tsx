import * as Phaser from "phaser";
import TestScene from "./TestScene";
import MultiScene from "./MultiScene";

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [TestScene],
}

export default class Game extends Phaser.Game {
    constructor() {
        super(config);
    }
}