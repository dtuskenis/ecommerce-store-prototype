import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent
} from '@ionic/react';

import UserManager, {UserInfo} from "../data/UserManager";

const ProfilePage: React.FC<UserInfo> = () => {

    const [userInfo, setUserInfo] = useState(new UserInfo("Not logged in"));

    useEffect(() => {
        UserManager.getUserInfo()
                   .then(maybeUserInfo => {
                       if (maybeUserInfo) setUserInfo(maybeUserInfo)
                   })
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account" />
                    </IonButtons>
                    <IonTitle>Профиль</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <p>
                    Email: { userInfo.email }
                </p>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
