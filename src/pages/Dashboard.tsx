import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { closeCircle } from 'ionicons/icons';

import {
  IonContent,
  IonIcon,
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

declare let appManager: AppManagerPlugin.AppManager;

export const DashboardPage = ({ history }: any) => {
  const dispatch = useDispatch()
  
  const user = useSelector((state:AppState) => state.auth.user)

  return (
  <>
    <IonContent fullscreen>
      <div className="close" onClick={(event) => { event.preventDefault(); appManager.close()}}>
        <IonIcon icon={closeCircle} size="large" />
      </div>
    </IonContent>
    <div className="content">
      <IonTitle>{user && user.id}</IonTitle>
      <IonTitle>{user && user.name}</IonTitle> 
        <IonButton size="large" color="warning" onClick={() => { dispatch(logout(() => history.push('/', { direction: 'forward' })))}}>
          <IonLabel color="dark">
            Logout
          </IonLabel>
      </IonButton>   
    </div>
  </>
  );
}