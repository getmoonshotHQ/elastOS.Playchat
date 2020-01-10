import React, { useEffect } from 'react';

import Lottie from 'react-lottie';

import {
  IonContent,
  IonButton
} from "@ionic/react";

import './Home.css';

declare global{
  interface Window {
      cordova : any
  }
}

declare let appManager: any; 
declare let hivePlugin: any; 

export const HomePage = ({ history }: any) => {

  const onDeviceReady = () => {
    console.log('onDeviceReady')
  } 

  useEffect(() => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    document.addEventListener('deviceready', onDeviceReady, false);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: require("../assets/9742-sheep-play-computer.json"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
  };

  return (
  <>
    <IonContent className="background" fullscreen>
      <Lottie options={defaultOptions} height="100%" width="100%" />
    </IonContent>
    <div className="content">
      <IonButton  strong size="large" color="danger" class="ion-text-uppercase" onClick={(e) => { e.preventDefault(); appManager.close()}}>
        Coming soon
      </IonButton>
    </div>
  </>
  );
}