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
import AuthenticationView from "./authentication/AuthenticationView";

const AccountPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Аккаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Content/>
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
        const subscription = UserManager.user().subscribe(user => {
            if (user) {
                setLoginState(LoginState.LOGGED_IN)
            } else {
                setLoginState(LoginState.NOT_LOGGED_IN)
            }
        });
        return () => subscription.unsubscribe()
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
            return <AuthenticationView />;
        case LoginState.LOGGED_IN:
            return <IonContent>
                <IonList>
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
                </IonList>
            </IonContent>;
    }
};

export default AccountPage;
