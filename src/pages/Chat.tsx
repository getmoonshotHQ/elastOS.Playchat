import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { gameController, chatboxEllipses, settings } from 'ionicons/icons';

import {
  IonContent,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonLabel,
  IonTitle
} from "@ionic/react";
import Lottie from 'react-lottie';

import { AppState } from '../store'

import './Dashboard.css';

declare global{
  interface Window {
      cordova : any
  }
}

export const ChatPage = ({ history }: any) => {
  const dispatch = useDispatch()
  
  const user = useSelector((state:AppState) => state.auth.user)

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: require("../assets/9852-coming-soon.json"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
  };

  return (
    <>
      <IonContent className="background2">
        <img src="/assets/images/playchat.png" alt="playchat" className="playchat" />
        <div className="container container-center">
        <h1 className="title">📝 Chat & Challenge your friends</h1>
        <Lottie options={defaultOptions} height="100%" width="100%" />
        </div>
      </IonContent>
      <div className="tabs">
        <IonGrid>
          <IonRow>
            <IonCol onClick={() => { history.push('/dashboard', { direction: 'forward' }) }}>
              <IonLabel><IonIcon icon={gameController}></IonIcon></IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel style={{ color: '#ff0066' }}><IonIcon icon={chatboxEllipses}></IonIcon></IonLabel>
            </IonCol>
            <IonCol onClick={() => { history.push('/profile', { direction: 'forward' }) }}>
              <IonLabel><IonIcon icon={settings}></IonIcon></IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
}