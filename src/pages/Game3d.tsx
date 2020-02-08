import React, { useEffect } from 'react';

import * as pc from "playcanvas"

import './Game3d.css';

export const Game3dPage = ({ history }: any) => {

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

  // Create a simple button
  var button = new pc.Entity();
  button.addComponent("button", {
      imageEntity: button
  });
  button.addComponent("element", {
      anchor: [ 0.5, 0.5, 0.5, 0.5 ],
      height: 40,
      pivot: [ 0.5, 0.5 ],
      type: pc.ELEMENTTYPE_IMAGE,
      width: 175,
      useInput: true
  });
  screen.addChild(button);

  // Create a label for the button
  var label = new pc.Entity();
  label.addComponent("element", {
      anchor: [ 0.5, 0.5, 0.5, 0.5 ],
      color: new pc.Color(0, 0, 0),
      fontSize: 32,
      height: 64,
      pivot: [ 0.5, 0.5 ],
      text: "CLICK ME",
      type: pc.ELEMENTTYPE_TEXT,
      width: 128,
      wrapLines: true
  });
  button.addChild(label);

  // Change the background color every time the button is clicked
      //@ts-ignore: Unreachable code error
  button.button.on('click', function (e) {
    //@ts-ignore: Unreachable code error
      camera.camera.clearColor = new pc.Color(Math.random(), Math.random(), Math.random());
  });


  }, []);

  return (
    <canvas id="game"></canvas>
  );
}