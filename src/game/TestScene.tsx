import * as Phaser from "phaser"

import test from '../assets/phaser.png';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super("TestScene");
    }

    preload() {
        console.log('preload')
        this.load.crossOrigin = 'anonymous'

        
        var loadingText = this.add.text(379, 211, "Loading (0%)");
        loadingText.setOrigin(1, 1);

        this.load.on('progress', function (value:any) {
            console.log('progress')
            loadingText.setText("Loading (" + Math.ceil(value) * 100 + "%)");
            console.log(value);
        });
    
        this.load.on('complete', function () {
    
            console.log('complete')
    
        });

        this.load.on('fileprogress', function (file:any) {
            console.log(file.src);
        });
        this.load.on('filecomplete', function (file:any) {
            console.log('filecomplete');
        });
        this.load.on('complete', function () {
            loadingText.destroy();
            console.log('complete');
        });
        this.load.on('progress', function (value:any) {
            console.log("yay" + value);
        });

        this.load.on('loaderror', function (error:any) {
    
            console.log('error', error)
    
        });

        this.load.image("phaser", test)
        this.load.start()

    }

    create() {
        console.log('create')
        //const background = this.add.image(0, 0, "phaser");
       //this.textures.addImage('phaser', require("../assets/phaser.png"))
        //background.setOrigin(0, 0);

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        const text = this.add.text(0, 0, "phaser 2.9 text bounds", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    }
}