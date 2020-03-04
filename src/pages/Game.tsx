import React, { useEffect, useCallback, useRef } from 'react';

import * as pc from "playcanvas"

import './Game.css';

window.pc = pc

export const GamePage = ({ history }: any) => {

  const appRef = useRef<any>(null)
  const devicesRef = useRef<any>(null)
  const $canvasRef = useRef<HTMLCanvasElement>(null);

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'back' });
    },
    [history],
  );

  useEffect(() => {

    if($canvasRef.current) {
      devicesRef.current = {
          elementInput: new pc.ElementInput($canvasRef.current, {
          useMouse: true,
          useTouch: true
        }),
        keyboard: new pc.Keyboard(window),
        mouse: new pc.Mouse($canvasRef.current),
        gamepads: null,
        touch: new pc.TouchDevice($canvasRef.current)
      };

      const configureCss = (fillMode:any, width:any, height:any) => {
        // Configure resolution and resize event
        if ($canvasRef.current && $canvasRef.current.classList) {
          $canvasRef.current.classList.add('fill-mode-' + fillMode);
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
        if(appRef.current && $canvasRef.current) {
          appRef.current.resizeCanvas($canvasRef.current.width, $canvasRef.current.height);
          $canvasRef.current.style.width = '';
          $canvasRef.current.style.height = '';
        
          var fillMode = appRef.current._fillMode;
        
          if (fillMode === pc.FILLMODE_NONE || fillMode === pc.FILLMODE_KEEP_ASPECT) {
              if ((fillMode === pc.FILLMODE_NONE && $canvasRef.current.clientHeight < window.innerHeight) || ($canvasRef.current.clientWidth / $canvasRef.current.clientHeight >= window.innerWidth / window.innerHeight)) {
                $canvasRef.current.style.marginTop = Math.floor((window.innerHeight - $canvasRef.current.clientHeight) / 2) + 'px';
              } else {
                $canvasRef.current.style.marginTop = '';
              }
          }
        }
      };

      try {
        appRef.current = new pc.Application($canvasRef.current as Element, {
          elementInput: devicesRef.current.elementInput,
          keyboard: devicesRef.current.keyboard,
          mouse: devicesRef.current.mouse,
          gamepads: devicesRef.current.gamepads,
          touch: devicesRef.current.touch,
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
        appRef.current.configure("assets/game/flappy-bird/config.json", (err:any) => {
            if (err) {
                console.error(err);
            }

            configureCss(appRef.current._fillMode, appRef.current._width, appRef.current._height);

            // do the first reflow after a timeout because of
            // iOS showing a squished iframe sometimes
            setTimeout(function () {
                reflow();

                window.addEventListener('resize', reflow, false);
                window.addEventListener('orientationchange', reflow, false);

                appRef.current.preload(function (err:any) {
                    if (err) {
                        console.error(err);
                    }

                    appRef.current.loadScene("assets/game/flappy-bird/877575.json", (err:any, scene:any) => {
                        if (err) {
                            console.error(err);
                        }

                        appRef.current.start();

                        appRef.current.on('game:exit', () => {
                          appRef.current.destroy();
                          appRef.current = null;
                          devicesRef.current = null;
                          goTo('/dashboard')
                        })
                    });
                });
            });
        });
      };

      configure();
    }

  }, [history, goTo]);

  return (
    <canvas ref={$canvasRef} id="application-canvas"></canvas>
  );
}
