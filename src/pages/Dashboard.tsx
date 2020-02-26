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

import Card from '../components/Card'

import { AppState } from '../store'

import './Dashboard.css';

declare global{
  interface Window {
      cordova : any
  }
}

export const DashboardPage = ({ history }: any) => {
  const dispatch = useDispatch()
  
  const user = useSelector((state:AppState) => state.auth.user)

  return (
    <>
      <IonContent className="background2">
        <img src="/assets/images/playchat.png" alt="playchat" className="playchat" />
        <div className="container">
          <h1 className="title">👻 Games</h1>
          <IonGrid className="grid">
            <IonRow className="ion-align-items-center">
              <IonCol onClick={() => { history.push('/game', { direction: 'forward' }) }}>
                <Card active={true}  label="Flappy bird" imageURL="/assets/images/game/flappy-bird.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Monopoly" imageURL="/assets/images/game/monopoly.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Roobix" imageURL="/assets/images/game/roobix.jpg" />  
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol>
                <Card label="Space Buggy" imageURL="/assets/images/game/space-buggy.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Lamb Cannon" imageURL="/assets/images/game/lamb-cannon.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Asteroids" imageURL="/assets/images/game/asteroids.jpg" />
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol>
                <Card label="Bowling" imageURL="/assets/images/game/bowling.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Space Pirates" imageURL="/assets/images/game/space-pirates.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Master Archer" imageURL="/assets/images/game/master-archer.jpg" />
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol>
                <Card label="Titanfall 2" imageURL="/assets/images/game/titanfall-2.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Swooop" imageURL="/assets/images/game/swooop.jpg" />
              </IonCol>
              <IonCol>
                <Card label="Boing!" imageURL="/assets/images/game/boing.jpg" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
      <div className="tabs">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel style={{ color: '#ff0066' }}><IonIcon icon={gameController}></IonIcon></IonLabel>
            </IonCol>
            <IonCol onClick={() => { history.push('/chat', { direction: 'forward' }) }}>
              <IonLabel><IonIcon icon={chatboxEllipses}></IonIcon></IonLabel>
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
