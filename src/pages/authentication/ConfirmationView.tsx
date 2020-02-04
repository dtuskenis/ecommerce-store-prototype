import React from 'react';
import {
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
} from "@ionic/react";

import "./AuthenticationView.css"

const ConfirmationView: React.FC = () => {
    return <IonContent>
        <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Пароль</IonLabel>
            <IonInput></IonInput>
        </IonItem>
    </IonContent>;
};

export default ConfirmationView;