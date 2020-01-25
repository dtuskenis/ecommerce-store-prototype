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

const ProfilePage: React.FC = () => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        UserManager.getUser()
                   .then(user => setUserInfo(user?.info || null))
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
                    Email: { userInfo?.email || "" }
                </p>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
