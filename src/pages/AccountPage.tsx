import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import "./AccountPage.css"

import UserManager from "../data/UserManager";
import {Authenticator} from "aws-amplify-react";

const AccountPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Аккаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <Content />
      </IonContent>
    </IonPage>
  );
};

enum LoginState {
    UNKNOWN,
    NOT_LOGGED_IN,
    LOGGED_IN,
}

const Content: React.FC = () => {

    const [loginState, setLoginState] = useState(LoginState.UNKNOWN);

    useEffect(() => {
        UserManager.getUser()
                   .then(user => {
                       if (user) {
                           setLoginState(LoginState.LOGGED_IN)
                       } else {
                           setLoginState(LoginState.NOT_LOGGED_IN)
                       }
                   });
    }, []);

    const logout = () => {
        UserManager.logout().then(() => setLoginState(LoginState.NOT_LOGGED_IN))
    };

    switch (loginState) {
        case LoginState.UNKNOWN:
            return <div className="spin">
                <IonSpinner name="dots"/>
            </div>;
        case LoginState.NOT_LOGGED_IN:
            return <Authenticator onStateChange={ (authState) => {

                if (authState === "signedIn") {
                    setLoginState(LoginState.LOGGED_IN);
                    UserManager.updateUser()
                }
            } }/>;
        case LoginState.LOGGED_IN:
            return <IonList>
                <IonItem routerLink="/account/profile">
                    <IonLabel>
                        <h2>Профиль</h2>
                    </IonLabel>
                </IonItem>
                <IonItem routerLink="/account/orders">
                    <IonLabel>
                        <h2>История заказов</h2>
                    </IonLabel>
                </IonItem>
                <IonItem onClick={ () => logout()  }>
                    <IonLabel color="danger">
                        <h2>Выйти</h2>
                    </IonLabel>
                </IonItem>
            </IonList>;
    }
};

export default AccountPage;
