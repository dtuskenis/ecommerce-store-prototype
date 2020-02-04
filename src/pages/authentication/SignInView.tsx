import React, {useState} from 'react';
import {
    IonButton,
    IonItem,
    IonLabel,
    IonText,
} from "@ionic/react";

import "./AuthenticationView.css"
import InputField from "../../widgets/InputField";
import UserManager from "../../data/UserManager";

export type SignInData = {
    email: string,
    password: string
}

const SignInView: React.FC<{ onSubmit: (process: Promise<any>) => void }> = ({ onSubmit }) => {

    const [credentials, setCredentials] = useState<SignInData>({ email: "", password: "" });

    return <div className="authentication-view">
        <IonItem className="authentication-input-container">
            <IonLabel className="authentication-input-label" position="floating" color="medium">Email</IonLabel>
            <InputField className="authentication-input"
                        type="email"
                        onInputChanged={ input => setCredentials({ email: input, password: credentials.password}) }
                        />
        </IonItem>
        <IonItem className="authentication-input-container">
            <IonLabel className="authentication-input-label" position="floating" color="medium">Пароль</IonLabel>
            <InputField className="authentication-input"
                        type="password"
                        onInputChanged={ input => setCredentials({ email: credentials.email, password: input }) }
                        />
        </IonItem>
        <IonButton className="authentication-submit-button"
                   disabled={ credentials.email.length === 0 || credentials.password.length === 0 }
                   onClick={ () => onSubmit(UserManager.signIn(credentials.email,
                                                               credentials.password)) }
                   size="default"
                   expand="block">
            <IonText>
                Войти
            </IonText>
        </IonButton>
    </div>;
};

export default SignInView;