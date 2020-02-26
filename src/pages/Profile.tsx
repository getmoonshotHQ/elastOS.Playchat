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

import { logout } from '../store/auth'
import { AppState } from '../store'

import './Dashboard.css';

declare global{
  interface Window {
      cordova : any
  }
}

export const ProfilePage = ({ history }: any) => {
  const dispatch = useDispatch()
  
  const user = useSelector((state:AppState) => state.auth.user)

  return (
    <>
      <IonContent className="background2">
        <img src="/assets/images/playchat.png" alt="playchat" className="playchat" />
        <div className="container container-center">
          <h1 className="title">👩🏻‍💻 Profile</h1>
          <br />
          <IonLabel color="warning">{user && user.name}</IonLabel>
          <br />
          <IonButton size="large" color="warning" onClick={() => { dispatch(logout(() => history.push('/', { direction: 'forward' })))}}>
            <IonLabel color="dark">
              Logout
            </IonLabel>
          </IonButton>
        </div>
      </IonContent>
      <div className="tabs">
        <IonGrid>
          <IonRow>
            <IonCol onClick={() => { history.push('/dashboard', { direction: 'forward' }) }}>
              <IonLabel><IonIcon icon={gameController}></IonIcon></IonLabel>
            </IonCol>
            <IonCol onClick={() => { history.push('/chat', { direction: 'forward' }) }}>
              <IonLabel><IonIcon icon={chatboxEllipses}></IonIcon></IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel style={{ color: '#ff0066' }}><IonIcon icon={settings}></IonIcon></IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
}