import React, { useEffect } from 'react';

import * as pc from "playcanvas"

import './Game3d.css';


let app:any = null
let devices:any = null
let $canvas:HTMLCanvasElement|null = null

export const Game3dPage = ({ history }: any) => {

  useEffect(() => {

    window.pc = pc

    $canvas = document.getElementById('game') as HTMLCanvasElement;

    const createInputDevices = (canvas:HTMLCanvasElement) =>  {
      var devices = {
          elementInput: new pc.ElementInput(canvas, {
            useMouse: true,
            useTouch: true
          }),
          keyboard: new pc.Keyboard(window),
          mouse: new pc.Mouse(canvas),
          gamepads: null,
          touch: new pc.TouchDevice(canvas)
      };
  
      return devices;
  };


    devices = createInputDevices($canvas);

    try {
      app = new pc.Application($canvas, {
        elementInput: devices.elementInput,
        keyboard: devices.keyboard,
        mouse: devices.mouse,
        gamepads: devices.gamepads,
        touch: devices.touch,
        graphicsDeviceOptions: {
          'antialias': true,
          'alpha': false,
          'preserveDrawingBuffer': false,
          'preferWebGl2': true
        },
        assetPrefix: "",
        scriptPrefix: "",
        scriptsOrder: [ '21399972', '21399876', '4554207', '4554213', '4554214', '4554217', '4554219', '4554270', '4554271', '4554273', '4554276', '4554277', '4554279', '4831197', '20754603', '20755574' ]
      });
    } catch (err) {
        console.log('error', err)

        return;
    }
    

    const configure = () => {
      app.configure("assets/game/flappy-bird/config.json", (err:any) => {
          if (err) {
              console.error(err);
          }

          // configureCss(app._fillMode, app._width, app._height);

          // do the first reflow after a timeout because of
          // iOS showing a squished iframe sometimes
          setTimeout(function () {
              //reflow();

              //window.addEventListener('resize', reflow, false);
              //window.addEventListener('orientationchange', reflow, false);

              app.preload(function (err:any) {
                  if (err) {
                      console.error(err);
                  }

                  app.loadScene("assets/game/flappy-bird/404993.json", (err:any, scene:any) => {
                      if (err) {
                          console.error(err);
                      }

                      app.start();
                  });
              });
          });
      });
  };

  configure();

  }, []);

  /** 

  useEffect(() => {
    
    const canvas = document.getElementById('game') as HTMLCanvasElement;

    // Create the application and start the update loop
    var app = new pc.Application(canvas, {
      mouse: new pc.Mouse(document.body),
      touch: new pc.TouchDevice(document.body),
      elementInput: new pc.ElementInput(canvas)
  });
  app.start();

  // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  window.addEventListener("resize", function () {
      app.resizeCanvas(canvas.width, canvas.height);
  });

  // Create a camera
  var camera = new pc.Entity();
  camera.addComponent("camera", {
      clearColor: new pc.Color(0, 0, 0)
  });
  app.root.addChild(camera);

  // Create a 2D screen
  var screen = new pc.Entity();
  screen.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      scaleBlend: 0.5,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true
  });
  app.root.addChild(screen);

  /*pp.on("update", function (dt) {
    console.log("update")
    //if (camera.camera)
      //camera.camera!.clearColor = new pc.Color(Math.random(), Math.random(), Math.random());
  });
  app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

  // Create a Entity with a Box model component
  var box = new pc.Entity();
  box.addComponent("model", {
      type: "box",
  });

  // Create an Entity with a point light component and a sphere model component.
  var light = new pc.Entity();
  light.addComponent("light", {
      type: "point",
      color: new pc.Color(1, 0, 0),
      radius: 10
  });
  light.addComponent("model", {
      type: "sphere"
  });
  // Scale the sphere down to 0.1m
  light.setLocalScale(0.1, 0.1, 0.1);

  // Create an Entity with a camera component
  var camera = new pc.Entity();
  camera.addComponent("camera", {
      clearColor: new pc.Color(0.4, 0.45, 0.5)
  });

  // Add the new Entities to the hierarchy
  app.root.addChild(box);
  app.root.addChild(light);
  app.root.addChild(camera);

  // Move the camera 10m along the z-axis
  camera.translate(0, 0, 10);

  // Set an update function on the app's update event
  var angle = 0;
  app.on("update", function (dt) {
      angle += dt;
      if (angle > 360) {
          angle = 0;
      }

      // Move the light in a circle
      light.setLocalPosition(3 * Math.sin(angle), 0, 3 * Math.cos(angle));

      // Rotate the box
      box.setEulerAngles(angle*2, angle*4, angle*8);
  });

  }, []);

  */

  return (
    <canvas id="game"></canvas>
  );
}