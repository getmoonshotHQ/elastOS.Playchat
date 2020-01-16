import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { closeCircle } from 'ionicons/icons';

import {
  IonContent,
  IonIcon,
  IonButton,
  IonLabel
} from "@ionic/react";

import { logout } from '../store/auth'

import './Dashboard.css';

declare global{
  interface Window {
      cordova : any
  }
}

declare let appManager: AppManagerPlugin.AppManager;

export const DashboardPage = ({ history }: any) => {
  const dispatch = useDispatch()

  return (
  <>
    <IonContent fullscreen>
      <div className="close" onClick={(event) => { event.preventDefault(); appManager.close()}}>
        <IonIcon icon={closeCircle} size="large" />
      </div>
    </IonContent>
    <div className="content">
      Dashboard    
      <IonButton size="large" color="warning" onClick={() => { dispatch(logout(() => history.push('/', { direction: 'forward' })))}}>
        <IonLabel color="dark">
          Logout
        </IonLabel>
      </IonButton>   
    </div>
  </>
  );
}