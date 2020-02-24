import React, { useEffect } from 'react';

import * as pc from "playcanvas"

import './Game.css';

let app:any = null
let devices:any = null
let $canvas:HTMLCanvasElement

export const GamePage = ({ history }: any) => {

  useEffect(() => {

    $canvas = document.getElementById('application-canvas') as HTMLCanvasElement;

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

  const configureCss = (fillMode:any, width:any, height:any) => {
    // Configure resolution and resize event
    if ($canvas.classList) {
        $canvas.classList.add('fill-mode-' + fillMode);
    }

    // css media query for aspect ratio changes
    var css  = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
    css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
    css += "        width: auto;";
    css += "        height: 100%;";
    css += "        margin: 0 auto;";
    css += "    }";
    css += "}";

    // append css to style
    if (document.head.querySelector) {
      // @ts-ignore: Unreachable code error
      document.head.querySelector('style').innerHTML += css;
    }
};

const reflow = () => {
  app.resizeCanvas($canvas.width, $canvas.height);
  $canvas.style.width = '';
  $canvas.style.height = '';

  var fillMode = app._fillMode;

  if (fillMode === pc.FILLMODE_NONE || fillMode === pc.FILLMODE_KEEP_ASPECT) {
      if ((fillMode === pc.FILLMODE_NONE && $canvas.clientHeight < window.innerHeight) || ($canvas.clientWidth / $canvas.clientHeight >= window.innerWidth / window.innerHeight)) {
          $canvas.style.marginTop = Math.floor((window.innerHeight - $canvas.clientHeight) / 2) + 'px';
      } else {
          $canvas.style.marginTop = '';
      }
  }
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

          configureCss(app._fillMode, app._width, app._height);

          // do the first reflow after a timeout because of
          // iOS showing a squished iframe sometimes
          setTimeout(function () {
              reflow();

              window.addEventListener('resize', reflow, false);
              window.addEventListener('orientationchange', reflow, false);

              app.preload(function (err:any) {
                  if (err) {
                      console.error(err);
                  }

                  app.loadScene("assets/game/flappy-bird/877575.json", (err:any, scene:any) => {
                      if (err) {
                          console.error(err);
                      }

                      app.start();

                      app.on('game:exit', () => {
                        app.destroy();
                        history.push('/dashboard', { direction: 'forward' });
                      })
                  });
              });
          });
      });
  };

  configure();

  }, []);

  return (
    <canvas id="application-canvas"></canvas>
  );
}