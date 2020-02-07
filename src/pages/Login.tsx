import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import Lottie from 'react-lottie';
import { closeCircle } from 'ionicons/icons';

import {
  IonContent,
  IonIcon,
  IonButton,
  IonLabel
} from "@ionic/react";

import { useDID } from '../hooks/useDID'
import { login, authCheckStatus } from '../store/auth'

import './Login.css';

declare global{
  interface Window {
      cordova : any
  }
}

declare let appManager: AppManagerPlugin.AppManager; 

export const LoginPage = ({ history }: any) => {
  const dispatch = useDispatch()

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const user = credentials[0].credentialSubject
      dispatch(login(user, () => goTo('/dashboard')))
    }
   })
 
  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  const onDeviceReady = useCallback(
    () => {
      dispatch(authCheckStatus(() => goTo('/dashboard')));
    },
    [dispatch, goTo],
  );

  useEffect(() => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    document.addEventListener('deviceready', onDeviceReady, false);

    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, [onDeviceReady]);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: require("../assets/6370-keys.json"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
  };

  return (
  <>
    <IonContent className="background" fullscreen>
      <Lottie options={defaultOptions} height="100%" width="100%" />
      <div className="close" onClick={() => { appManager.close()}}>
        <IonIcon icon={closeCircle} size="large" />
      </div>
    </IonContent>
    <div className="content">
      <IonButton size="large" color="warning" onClick={() => { signIn({ name: true })}}>
        <IonLabel color="dark">
          <IonIcon src="/assets/did-icon.svg" /> Sign in with DID
        </IonLabel>
      </IonButton>          
    </div>
  </>
  );
}