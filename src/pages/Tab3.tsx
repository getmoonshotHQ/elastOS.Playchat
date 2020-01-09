import React from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonCard, IonContent, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/react';

const Tab3Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contact</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Follow us on Telegram</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>https://t.me/elastosbrowser</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
